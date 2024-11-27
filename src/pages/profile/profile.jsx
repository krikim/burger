import { NavLink, useNavigate } from "react-router-dom"
import styleProfile from "./profile.module.css"
import ProfileEdit from "./profile-edit"
import ProfileOrders from "./profile-orders"
/* eslint react/prop-types: 0 */
const ProfileOut = ({element}) => {
    const activeStyle = styleProfile.link+" text text_type_main-default p-2 "+styleProfile.active
    const inactiveStyle = styleProfile.link+" text text_type_main-default p-2"
    return (
        <>
            <div className={styleProfile.wrapper+' pt-20'}>
            <div className={styleProfile.part}>
            <NavLink
                    to="/profile"
                    className={({isActive}) => isActive ? activeStyle : inactiveStyle}
                    end
            >                    
                Профиль
            </NavLink> 
            <NavLink
                    to="/profile/orders"
                    className={({isActive}) => isActive ? activeStyle : inactiveStyle}
                    end
            >                    
                История заказов
            </NavLink> 
            <NavLink
                    to="/signout"
                    className={({isActive}) => isActive ? activeStyle : inactiveStyle}
            >                    
                Выход
            </NavLink> 
                        
                    
                <p className={styleProfile.text+" text text_type_main-small pt-20"}>
                    В этом разделе вы можете изменить свои персональные данные
                </p>
            </div>
            
             <div className={styleProfile.part}>
                {element}
            </div>
            </div>
        </>
    )

    
}
const Profile = ()=><ProfileOut element={<ProfileEdit/>}/>
export const Orders =() =><ProfileOut element={<ProfileOrders/>}/>
export default Profile