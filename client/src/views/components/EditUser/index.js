import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Button, Card, Form } from 'react-bootstrap'
import { fetchUserById } from '../../../redux/slices/user.slices'
import { useForm } from 'react-hook-form'

const EditUser = () => {
  const { user } = useSelector(state => state.userData)
  const { register, handleSubmit, formState: { errors } } = useForm()
  const dispatch = useDispatch()

  const submit = async (data) => {
    console.log(data)
  }

  const createFilds = () => {
    return Object.entries(user).filter(element => {
      const [name] = element
      if (name === 'permission' || name === 'id' || name === 'createdAt') return false
      return true
    })
  }

  const defineType = (keyName) => {
    const types = {
      email: 'email',
      password: 'password'
    }

    if (types[keyName]) {
      console.log(keyName, types[keyName])
      return types[keyName]
    }

    return
  }

  useEffect(() => {
    dispatch(fetchUserById())
  }, [])


  return (
    <>
      <Card className='p-3'>
        <Form onSubmit={(handleSubmit(submit))}>
          {createFilds(user).map((item, index) => {
            const [name, value] = item
            return (
              <Form.Group className='mb-2' key={index}>
                <Form.Label>{name[0].toUpperCase() + name.slice(1)}</Form.Label>
                <Form.Control
                  type={defineType(name)}
                  placeholder={name === 'password' ? 'new password' : value}
                  {...register(name)}
                />
              </Form.Group>
            )
          })}
          <Button variant="primary" type='submite'>
            Submit
          </Button>
        </Form>
      </Card>
    </>
  )
}

export default EditUser