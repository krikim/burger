import { Navigate } from 'react-router-dom';
import { signOut } from '../../services/api.js';
import { setUser,setAuth } from '../../services/userSlice.js';
import { useDispatch } from 'react-redux';
const SignOut = () =>{
    const dispatch = useDispatch();
    signOut()
    .then(res=>{
        if (res.success){
            console.log(res.message)
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            dispatch(setUser(null));
           
        }else{
            console.log('Failed to log out')
        }
})
    return (<Navigate to='/signin'/>)
}
export default SignOut