import { EmailInput,PasswordInput,Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, useNavigate } from "react-router-dom"
import styleSI from "./signin.module.css"
import { signIn } from "../services/api.js"
import { useDispatch } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { setAuth, setUser } from "../services/userSlice.js";


const SignIn = () => {

    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    
    const handleClick = (e) => {
        e.preventDefault()
        const email=document.getElementsByName('emailLogin')[0].value
        const password=document.getElementsByName('emailPass')[0].value
        console.log('cred:',email,password)
        signIn({email,password})
        .then(res=>{
            if (res.ok){
                return res.json();
                
            }else{
                console.log('error');
        
            }
        })
        .then(data=>{
            dispatch(setUser(data.user))
            dispatch(setAuth(true))
            localStorage.setItem('accessToken', data.accessToken)
            localStorage.setItem('refreshToken', data.refreshToken)
        })
        

        const { from } = location.state || {from: {pathname: '/'}}
        navigate({from});
        }
    
    return (
        
            <>
            <div className={styleSI.wrapper}>
                <p className="text text_type_main-medium mb-6">
                        Вход
                </p>
                <EmailInput
                    name={'emailLogin'}
                    placeholder="Email"
                    extraClass="mb-6"
                    defaultValue=''
                />
                <PasswordInput
                    name={'emailPass'}
                    extraClass="mb-6"
                    defaultValue=''
                />
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="medium"
                    extraClass="mb-20"
                    onClick={handleClick}
                >
                    Войти
                </Button>
                <p className="text text_type_main-default">
                    Вы - новый пользователь?&nbsp;
                    <Link className={styleSI.text} to="/register">
                        Зарегистрироваться
                    </Link>
                </p>
                <p className="text text_type_main-default mt-4">
                    Забыли пароль?&nbsp;
                    <Link className={styleSI.text} to="/forgot-pass">
                        Восстановить пароль
                    </Link>
                </p>
            </div>
          
        </>
    )

    
}

export default SignIn