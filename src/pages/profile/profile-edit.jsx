import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../services/userSlice"
import { updateUser } from "../../services/api"
import { EmailInput,PasswordInput,Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"

const ProfileEdit = () => {
const user = useSelector(state=>state.user.user)
    const [showEdit,setShowEdit] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const handleEdit = (e)=> {
        e.preventDefault()
        if (e.target.value.length>2){
            setShowEdit(true)
        }
        
    }
    const handleCancel = (e) =>{
        const email=document.getElementsByName('emailPro')[0]
        const password=document.getElementsByName('passwordPro')[0]
        const name = document.getElementsByName('namePro')[0]
        password.value='';
        email.value=user.email;
        name.value=user.name;
    }
    const handleClick = (e)=>{
        e.preventDefault()
        const email=document.getElementsByName('emailPro')[0].value
        const password=document.getElementsByName('passwordPro')[0].value
        const name = document.getElementsByName('namePro')[0].value
        console.log('cred:',email,password)
        updateUser({email,password,name})
        .then(res=>{
            console.log(res)
            if (res.user){
                dispatch(setUser(res.user))
                navigate('/profile')
            }
        })
    }
return(
            <>
                <Input
                    name={'namePro'}
                    placeholder="Имя"
                    extraClass="mb-6"
                    type={"text"}
                    icon="EditIcon"
                    onChange={handleEdit}
                    defaultValue={user.name}
                />
                <EmailInput
                    name={'emailPro'}
                    placeholder="Логин"
                    extraClass="mb-6"
                    icon="EditIcon"
                    onChange={handleEdit}
                    defaultValue={user.email}
                />
                <PasswordInput
                    name={'passwordPro'}
                    extraClass="mb-6"
                    icon="EditIcon"
                    onChange={handleEdit}
                />
                
               {showEdit&& <div className={styleProfile.buttons}>
                    <Button
                        htmlType="submit"
                        type="secondary"
                        size="large"
                        onClick={handleCancel}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                        onClick={handleClick}
                    >
                        Сохранить
                    </Button>
                </div>
                
                }
            </>
)
}

export default ProfileEdit;