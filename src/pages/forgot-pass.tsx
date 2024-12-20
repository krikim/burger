import { EmailInput,Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
import styleFP from "./forgot-pass.module.css"
//@ts-ignore
import { forgot } from "../services/api"
import { useNavigate } from "react-router-dom"
import { FormEvent, useRef } from "react"
const ForgotPass = () => {
    const form = useRef<HTMLFormElement|null>(null)
    
    const navigate = useNavigate()
    const handleClick= (e:FormEvent) =>{
        e.preventDefault()
        if (form.current!== null){
            const iForm = Array.from(form.current.elements) as HTMLInputElement[];

            const email = iForm[0].value
            forgot({ email })
                .then((res: { success: boolean; message: string }) => {
                    if (res.success) {
                        console.log(res.message)
                        localStorage.setItem('forgotPass', 'true')
                        navigate('/reset-pass', { replace: true })
                    }
                }) 
        }        
    }
    return (
        <>
            <div className={styleFP.wrapper}>
                <p className="text text_type_main-medium mb-6">
                        Восстановление пароля
                </p>
                <form ref={form} onSubmit={handleClick}>
                <EmailInput
                    name={'emailForgot'}
                    placeholder="Укажите Email"
                    extraClass="mb-6"
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
                    <Link className={styleFP.text} to="/signin">
                        Войти
                    </Link>
                </p>
            </div>
        </>
    )

    
}

export default ForgotPass