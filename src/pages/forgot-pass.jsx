import { EmailInput,Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
import styleFP from "./forgot-pass.module.css"
import { forgot } from "../services/api"
import { useNavigate } from "react-router-dom"
const ForgotPass = () => {
    const navigate = useNavigate()
    const handleClick= () =>{
        const email = document.getElementsByName('emailForgot')[0].value
           forgot({email})
           .then((res)=>{
                 if (res.success){
                    console.log(res.message)
                    navigate('/reset-pass',{replace:true})
                 }
           })         
    }
    return (
        <>
            <div className={styleFP.wrapper}>
                <p className="text text_type_main-medium mb-6">
                        Восстановление пароля
                </p>
                <EmailInput
                    name={'emailForgot'}
                    placeholder="Укажите Email"
                    extraClass="mb-6"
                />
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="medium"
                    extraClass="mb-20"
                    onClick={handleClick}
                >
                    Восстановить
                </Button>
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