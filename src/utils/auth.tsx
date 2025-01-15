import { useDispatch } from "react-redux"
import { getUser } from "../services/api.ts"
import { setAuth, setUser } from "../services/userSlice.ts"


export const checkAuth = () =>{
    const dispatch = useDispatch()
    if (localStorage.getItem("accessToken")){
      getUser()
      .then((res:{user:string})=>dispatch(setUser(res.user)))
      .finally(()=>dispatch(setAuth(true)))
    }
  }
  
  