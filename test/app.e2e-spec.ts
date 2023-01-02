import { faker } from '@faker-js/faker';
import axios from 'axios';
import { execSync } from 'child_process';

const createUser = (override = {}) => {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    phone: faker.phone.number('###########'),
    ...override,
  };
};

const createAuthHeaders = (token: string) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

describe('AppController', () => {
  const baseURL = 'http://localhost';
  let rootToken: string;
  let createdUserByRoot: any;
  let userToken: string;
  let createdUser: any;

  afterAll(async () => {
    execSync('docker-compose restart');
  });

  test('should be able to login as root', async () => {
    const body = {
      email: 'root@mail.com',
      password: 'admin',
    };

    const path = '/auth/login';

    const url = baseURL + path;

    const response = await axios.post(url, { ...body }).catch((error) => {
      throw new Error(error);
    });

    const { status, data } = response;
    rootToken = data.access_token;

    expect(status).toBe(201);
    expect(rootToken).toBeDefined();
  });

  test('should be able to create a user as root', async () => {
    const body = createUser();

    const path = '/user';

    const url = baseURL + path;

    const response = await axios
      .post(url, { ...body }, createAuthHeaders(rootToken))
      .catch((error) => {
        throw new Error(error);
      });

    const { status, data } = response;

    expect(status).toBe(201);
    expect(data.user).toBeDefined();
    const { user } = data;
    createdUserByRoot = user;
    createdUserByRoot.props.password = body.password;

    expect(user._id).toBeDefined();
    expect(Object.keys(user.props)).toHaveLength(5);
  });

  test('should be able to list all users as root', async () => {
    const response = await axios
      .get(baseURL + '/user/index', createAuthHeaders(rootToken))
      .catch((error) => {
        throw new Error(error);
      });

    const { data } = response;

    expect(data.users).toHaveLength(13);
  });

  test('should be able to find users by name', async () => {
    const response = await axios
      .get(baseURL + `/user/find`, {
        params: { name: createdUserByRoot.props.name },
        ...createAuthHeaders(rootToken),
      })
      .catch((error) => {
        throw new Error(error);
      });

    const { data } = response;

    expect(data.users.length > 0).toBeTruthy();
  });

  test('should be able to find users by email', async () => {
    const response = await axios
      .get(baseURL + `/user/find`, {
        params: { email: createdUserByRoot.props.email },
        ...createAuthHeaders(rootToken),
      })
      .catch((error) => {
        throw new Error(error);
      });

    const { data } = response;

    expect(data.user.props.email).toEqual(createdUserByRoot.props.email);
  });

  test('should be able to get information from users as root', async () => {
    const path = `/user/${createdUserByRoot._id}`;

    const response = await axios
      .get(baseURL + path, {
        headers: {
          authorization: `Bearer ${rootToken}`,
        },
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });

    const { status, data } = response;

    expect(status).toBe(200);
    expect(data.user._id).toBe(createdUserByRoot._id);
  });

  test('should be able to update a user as root', async () => {
    const path = `/user/${createdUserByRoot._id}`;

    const toUpdate = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number('##9########'),
    };

    const updateTime = new Date();

    const updateResponse = await axios
      .patch(
        baseURL + path,
        { ...toUpdate },
        { headers: { authorization: `Bearer ${rootToken}` } },
      )
      .catch((error) => {
        throw new Error(error);
      });

    expect(updateResponse.status).toBe(200);

    const response = await axios
      .get(baseURL + path, {
        headers: { authorization: `Bearer ${rootToken}` },
      })
      .catch((error) => {
        throw new Error(error);
      });

    const { data } = response;

    const date = new Date(data.user.props.updatedAt);

    expect(data.user.props.name).toBe(toUpdate.name);
    expect(data.user.props.email).toBe(toUpdate.email);
    expect(data.user.props.phone).toBe(toUpdate.phone);
    expect(date.valueOf()).toBeGreaterThan(updateTime.valueOf());
  });

  test('should be able to delete a user as root', async () => {
    const path = `/user/${createdUserByRoot._id}`;

    const deleteResponse = await axios
      .delete(baseURL + path, {
        headers: { authorization: `Bearer ${rootToken}` },
      })
      .catch((error) => {
        throw new Error(error);
      });

    expect(deleteResponse.status).toBe(200);

    const response = await axios
      .get(baseURL + path, {
        headers: { authorization: `Bearer ${rootToken}` },
      })
      .catch((error) => {
        throw new Error(error);
      });

    const { data } = response;
    expect(data.user.props.deletedAt).toBeDefined();
  });

  test('should return 401 when deleted user try to login', async () => {
    await axios
      .post(baseURL + '/auth/login', {
        email: createdUserByRoot.email,
        password: createdUserByRoot.password,
      })
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(401);
      });
  });

  test('should be able to login as user', async () => {
    const newUser = createUser();

    const createdResponse = await axios.post(
      baseURL + '/user',
      {
        ...newUser,
      },
      {
        headers: {
          authorization: `Bearer ${rootToken}`,
        },
      },
    );

    createdUser = createdResponse.data.user;

    const response = await axios
      .post(baseURL + '/auth/login', {
        email: newUser.email,
        password: newUser.password,
      })
      .catch((error) => {
        console.log(error);
        throw new Error(error);
      });

    const { status, data } = response;

    userToken = data.access_token;

    expect(status).toBe(201);
    expect(userToken).toBeDefined();
  });

  test('user should be able to update itself', async () => {
    const path = `/user/${createdUser._id}`;

    const toUpdate = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number('##9########'),
    };

    const updateTime = new Date();

    const updateResponse = await axios
      .patch(
        baseURL + path,
        { ...toUpdate },
        { headers: { authorization: `Bearer ${userToken}` } },
      )
      .catch((error) => {
        throw new Error(error);
      });

    expect(updateResponse.status).toBe(200);

    const response = await axios
      .get(baseURL + '/user', {
        headers: { authorization: `Bearer ${userToken}` },
      })
      .catch((error) => {
        throw new Error(error);
      });

    const { data } = response;

    const date = new Date(data.user.props.updatedAt);

    expect(data.user.props.name).toBe(toUpdate.name);
    expect(data.user.props.email).toBe(toUpdate.email);
    expect(data.user.props.phone).toBe(toUpdate.phone);
    expect(date.valueOf()).toBeGreaterThan(updateTime.valueOf());
  });

  test('should return 403 when user try to edit your own permission', async () => {
    const path = `/user/${createdUser._id}`;

    const toUpdate = {
      permission: 1,
    };

    await axios
      .patch(
        baseURL + path,
        { ...toUpdate },
        { headers: { authorization: `Bearer ${userToken}` } },
      )
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
      });
  });

  test('should return 403 when user try create another user', async () => {
    const body = createUser();

    const response = await axios
      .post(
        baseURL + '/user',
        { ...body },
        {
          headers: {
            authorization: `Bearer ${userToken}`,
          },
        },
      )
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
      });
    expect(response).toBeFalsy();
  });

  test('should return 403 when user try find users by name', async () => {
    const response = await axios
      .get(baseURL + `/user/find`, {
        params: { name: createdUserByRoot.props.name },
        ...createAuthHeaders(userToken),
      })
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
      });
    expect(response).toBeFalsy();
  });

  test('should return 403 when user try find users by email', async () => {
    const response = await axios
      .get(baseURL + `/user/find`, {
        params: { email: createdUserByRoot.props.email },
        ...createAuthHeaders(userToken),
      })
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
      });
    expect(response).toBeFalsy();
  });

  test('should return 403 when user try list all users', async () => {
    const response = await axios
      .get(baseURL + '/user/index', {
        headers: { authorization: `Bearer ${userToken}` },
      })
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
      });
    expect(response).toBeFalsy();
  });

  test('should return 403 when user try get information another user', async () => {
    const path = `/user/${createdUserByRoot._id}`;

    const response = await axios
      .get(baseURL + path, {
        headers: {
          authorization: `Bearer ${userToken}`,
        },
      })
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
      });
    expect(response).toBeFalsy();
  });

  test('should return 403 when user try delete another user', async () => {
    const path = `/user/${createdUserByRoot._id}`;

    const response = await axios
      .delete(baseURL + path, {
        headers: { authorization: `Bearer ${userToken}` },
      })
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
        return false;
      });

    expect(response).toBeFalsy();
  });

  test('should retrun 403 when user try update another user', async () => {
    const path = `/user/${createdUserByRoot._id}`;

    const toUpdate = {
      name: faker.name.firstName(),
      email: faker.internet.email(),
      phone: faker.phone.number('##9########'),
    };

    const response = await axios
      .patch(
        baseURL + path,
        { ...toUpdate },
        { headers: { authorization: `Bearer ${userToken}` } },
      )
      .catch((error) => {
        const { response } = error;
        expect(response.status).toBe(403);
        return false;
      });

    expect(response).toBeFalsy();
  });
});
