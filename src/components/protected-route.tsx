import { FC } from "react"
import { useSelector } from "react-redux"
import { Navigate, useLocation } from "react-router-dom"
import { getStateAuth, getStateUser } from "../services/userSlice"

interface IProtected{
    onlyUnAuth?: boolean, 
    component: React.ReactElement
}
const Protected:FC<IProtected> = ({onlyUnAuth= false, component})=>{
    const user = useSelector(getStateUser)
    const isAuthChecked:boolean = useSelector(getStateAuth)
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
interface IOnlyUnAuth {
    component: React.ReactElement
}
export const OnlyUnAuth:FC<IOnlyUnAuth> = ({component}) => (
    <Protected onlyUnAuth={true} component={component} />
)