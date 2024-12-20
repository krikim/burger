import { PasswordInput,Input,Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate } from "react-router-dom"
import styleRP from "./reset-pass.module.css"
import { useNavigate } from "react-router-dom"
//@ts-ignore
import { reset } from "../services/api"
import { FormEvent, useRef } from "react"

const ResetPass = () => {
    const navigate = useNavigate()
    const forgotPass:string|null = localStorage.getItem('forgotPass')
    const form = useRef<HTMLFormElement|null>(null)

    const handleClick= (e:FormEvent) =>{
        e.preventDefault();
        if (form.current !== null){
            const iForm = Array.from(form.current.elements) as HTMLInputElement[];
              
            const pass = iForm[0].value;
            const token = iForm[1].value;
            console.log(pass,token)
           reset({pass,token})
           .then((res: { success: boolean; message: string }) => {
                 if (res.success){
                    localStorage.setItem('forgotPass','false')
                    console.log(res.message)
                    navigate('/signin',{replace:true})
                 }
           })         
        }
    }
    return (
        <>
        
             {forgotPass === 'true'?<div className={styleRP.wrapper}>
                <p className="text text_type_main-medium mb-6">
                        Восстановление пароля
                </p>
                <form ref={form} onSubmit={handleClick} >
            
                <PasswordInput
                    name={'passwordReset'}
                    extraClass="mb-6"
                    placeholder='Введите новый пароль'
                />
                <Input
                    name={'nameReset'}
                    placeholder="Код из письма"
                    extraClass="mb-6"
                    type={"text"}
                />
                <Button 
                    htmlType="submit" 
                    type="primary" 
                    size="medium"
                    extraClass="mb-20"
                    
                >
                    Восстановить
                </Button>
                </form>
                <p className="text text_type_main-default">
                    Вспомнили?&nbsp;
                    <Link className={styleRP.text} to="/signin">
                        Войти
                    </Link>
                </p>
            </div>:<Navigate to='/forgot-pass'/>}
            
        </>
    )

    
}

export default ResetPass