import { PasswordInput,Input,Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link } from "react-router-dom"
import styleRP from "./reset-pass.module.css"
import { useNavigate } from "react-router-dom"
import { reset } from "../services/api"
const ResetPass = () => {
    const navigate = useNavigate()
    const handleClick= () =>{
            const pass = document.getElementsByName('passwordReset')[0].value;
            const token = document.getElementsByName('nameReset')[0].value;
           reset({pass,token})
           .then((res)=>{
                 if (res.success){
                    console.log(res.message)
                    navigate('/signin',{replace:true})
                 }
           })         
    }
    return (
        <>
            <div className={styleRP.wrapper}>
                <p className="text text_type_main-medium mb-6">
                        Восстановление пароля
                </p>
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
                    <Link className={styleRP.text} to="/signin">
                        Войти
                    </Link>
                </p>
            </div>
        </>
    )

    
}

export default ResetPass