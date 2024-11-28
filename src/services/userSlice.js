import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getUser } from './api'



export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_,{dispatch}) => {
    if (localStorage.getItem('accessToken')){
      getUser()
      .then(res=>dispatch(setUser(res.user)))
      .finally(dispatch(setAuth(true)))
      return response.data
    }
    else{
      dispatch(setAuth(true))
    }
  }
)


export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthChecked:false,
    user:null,
    forgotPass:false,
    },
  reducers: {
    setUser:{
        reducer: (state, action) => {state.user=action.payload},
    },
    setAuth:{ 
      reducer: (state, action) => {
        state.isAuthChecked = action.payload
      } 
    },
    setForgotPass: {
        reducer: (state,action)=>{
                     state.forgotPass = action.payload
                },
        
      }
    
},
})

export const {  setUser, setAuth, setForgotPass } = userSlice.actions

export default userSlice.reducer