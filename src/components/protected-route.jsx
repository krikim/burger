import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"

const Protected = ({onlyUnAuth= false, component})=>{
    const user = useSelector(state=>state.user.user)
    const isAuthChecked = useSelector(state=>state.user.isAuthChecked)
    const location = useLocation()
    console.log(user);
    if (!isAuthChecked) return <p>User Загрузка...</p>

    if (!onlyUnAuth && !user){
        return <Navigate to="/signin" state={{from:location}} />
    } 
    if (onlyUnAuth && user){
        const { from } = location.state || {from: {pathname: '/'}}
        return <Navigate to={from} />
    }
    return component
}

export const OnlyAuth = Protected
export const OnlyUnAuth = ({component}) => (
    <Protected onlyUnAuth={true} component={component} />
)