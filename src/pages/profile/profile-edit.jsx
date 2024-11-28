import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "../../services/userSlice"
import { updateUser } from "../../services/api"
import { EmailInput,PasswordInput,Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import styleProfile from './profile.module.css'

const ProfileEdit = () => {
const user = useSelector(state=>state.user.user)
    const [showEdit,setShowEdit] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const form = useRef();
    
    const handleEdit = (e)=> {
        e.preventDefault()
        if (e.target.value.length>2){
            setShowEdit(true)
        }
        
    }
    const handleCancel = (e) =>{
        e.preventDefault()
        form.current[2].value='';
        form.current[1].value=user.email;
        form.current[0].value=user.name;
    }
    const handleClick = (e)=>{
        e.preventDefault()
        const name=form.current[0].value
        const email=form.current[1].value
        const password=form.current[2].value

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
                <form ref={form} onSubmit={handleClick} onReset={handleCancel}>
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
                        htmlType="reset"
                        type="secondary"
                        size="large"
                        //onClick={handleCancel}
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                       // onClick={handleClick}
                    >
                        Сохранить
                    </Button>
                </div>
                
                }
                </form>
            </>
)
}

export default ProfileEdit;