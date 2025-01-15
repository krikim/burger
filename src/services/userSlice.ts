import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getUser } from './api'



export const checkUserAuth:any = createAsyncThunk(
  'user/checkUserAuth',
  async (_,{dispatch}) => {
    if (localStorage.getItem('accessToken')){
      return getUser()
      .then(res=>dispatch(setUser(res.user)))
      .finally(() => dispatch(setAuth(true)))
    }
    else{
      dispatch(setAuth(true))
    }
  }
)
export type TUser = {
  email?:string;
  name?:string;
  password?: string;
}

type TIstate = {
  isAuthChecked: boolean,
  user: TUser | null,
  forgotPass: boolean,
}
const iState:TIstate = {
  isAuthChecked:false,
  user:null,
  forgotPass:false,
  }
export const userSlice = createSlice({
  name: 'user',
  initialState: iState,
  reducers: {
    setUser: (state:TIstate, action:PayloadAction<TUser|null>) => {
                  state.user=action.payload
                },
    setAuth:(state:TIstate, action:PayloadAction<boolean>) => {
        state.isAuthChecked = action.payload
      }, 
    setForgotPass: (state:TIstate,action:PayloadAction<boolean>)=>{
                     state.forgotPass = action.payload
                },
        

    
},
selectors: {
  getStateUser: (state:TIstate)=>state.user,
  getStateAuth: (state:TIstate)=>state.isAuthChecked,
  getStateForgotPass: (state:TIstate)=>state.forgotPass,
 
},
})

export const {  setUser, setAuth, setForgotPass } = userSlice.actions;
export const { getStateUser,getStateAuth,getStateForgotPass } = userSlice.selectors;
export default userSlice.reducer;