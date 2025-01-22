import { useNavigate } from "react-router-dom"
import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { setUser, TUser } from "../../services/userSlice.ts"
import { updateUser } from "../../services/api.ts"
import { EmailInput,PasswordInput,Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import styleProfile from './profile.module.css'
import { getStateUser } from "../../services/userSlice.ts"
import { useDispatch, useSelector } from "../../services/store.ts"

const ProfileEdit = () => {
const user:TUser|null = useSelector(getStateUser)

    const [showEdit,setShowEdit] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const form = useRef<HTMLFormElement|null>(null);
    
    const handleEdit = (e:ChangeEvent<HTMLInputElement>)=> {
        e.preventDefault()
        if (e.target.value.length>2){
            setShowEdit(true)
        }
        
    }
    const handleCancel = (e:FormEvent) =>{
        e.preventDefault()
        if (form.current!==null&&user){
            const iForm = Array.from(form.current.elements) as HTMLInputElement[];

            iForm[2].value='';
            iForm[1].value=user.email?user.email:'';
            iForm[0].value=user.name?user.name:'';
        }
    }
    const handleClick = (e:FormEvent)=>{
        e.preventDefault()
        if (form.current!==null){
            const iForm = Array.from(form.current.elements) as HTMLInputElement[];
            const name=iForm[0].value
            const email=iForm[1].value
            const pass=iForm[2].value
        

        updateUser({email,pass,name})
        .then((res:{user:TUser})=>{
            console.log(res)
            if (res.user){
                dispatch(setUser(res.user))
                navigate('/profile')
            }
        })
    }
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
                    defaultValue={user?.name}
                    
                    
                />
                <EmailInput
                    name={'emailPro'}
                    placeholder="Логин"
                    extraClass="mb-6"
                    icon="EditIcon"
                    onChange={handleEdit}
                    defaultValue={user?.email}
                    
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
                        
                    >
                        Отмена
                    </Button>
                    <Button
                        htmlType="submit"
                        type="primary"
                        size="large"
                       
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