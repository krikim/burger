import { Navigate } from 'react-router-dom';
import { signOut } from '../../services/api';
import { setUser } from '../../services/userSlice';
import { useDispatch } from 'react-redux';
const SignOut = () =>{
    const dispatch = useDispatch();
    signOut()
    .then((res: { success: boolean; message: string }) => {
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