import { useDispatch } from "react-redux"
import { getUser } from "../services/api"
import { setAuth, setUser } from "../services/userSlice"

export const checkAuth = () =>{
    const dispatch = useDispatch()
    if (localStorage.getItem("accessToken")){
      getUser()
      .then(res=>dispatch(setUser(res.user)))
      .finally(()=>dispatch(setAuth(true)))
    }
  }
  
  