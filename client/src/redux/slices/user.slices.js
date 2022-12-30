import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { api } from '../../services/api'

const initialState = {
  user: {
    name: '',
    email: '',
    phone: '',
    permisson: 0,
    createdAt: ''
  }
}

export const fetchUserById = createAsyncThunk('user', async (userId = null) => {
  let user
  let url = '/user'

  if (userId) {
    url += `/${userId}`
  }

  const response = await api.get(url, {
    headers: {
      authorization: `Bearer ${localStorage.getItem('access_token')}`
    }
  }).catch(error => false)

  if (!response) return {}

  user = response.data.user

  return {
    id: user._id,
    name: user.props.name,
    password: user.props.password,
    email: user.props.email,
    phone: user.props.phone,
    permission: user.props.permission,
    createdAt: user.props.createdAt,
  }

})

export const userSlice = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    update: (state, action) => {
      state.user = { ...state.user, ...action }
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = { ...action.payload }
    })
  }
})

export const { update } = userSlice.actions

export default userSlice.reducer