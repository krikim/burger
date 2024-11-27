import { EmailInput,PasswordInput,Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate, useLocation } from "react-router-dom"
import styleReg from "./register.module.css"
import { useDispatch } from "react-redux"
import { register } from "../services/api"
import { setUser } from "../services/userSlice"
const Register = () => {
    const dispatch = useDispatch()
    const location = useLocation()
        
    const handleClick = (e) => {
        e.preventDefault()
        const email=document.getElementsByName('emailReg')[0].value
        const password=document.getElementsByName('passReg')[0].value
        const name = document.getElementsByName('nameReg')[0].value
        console.log('cred:',email,password)
        register({email,password,name})
        .then(res=>{
            if (res.ok){
                return res.json()
                 
            }else{
                console.log('error');
                
            }
        })
        .then((res)=>{
            dispatch(setUser(res.user))
                 localStorage.setItem("refreshToken", res.refreshToken); 
                 localStorage.setItem("accessToken", res.accessToken);
                 console.log(
                    'User registered successfully. Redirecting to profile...',
                    res,
                    res.user,
                    res.accessToken,
                    res.refreshToken
                 );
                 <Navigate to='/profile' />
   
        })
    }
        
        
    
    return (
        <>
            <div className={styleReg.wrapper}>
                <p className="text text_type_main-medium mb-6">
                        Регистрация
    
                </p>
                <Input
                    name={'nameReg'}
                    placeholder="Имя"
                    extraClass="mb-6"
                    type={"text"}
                />
                <EmailInput
                    name={'emailReg'}
                    placeholder="Email"
                    extraClass="mb-6"
                />
                <PasswordInput
                    name={'passReg'}
                    extraClass="mb-6"
                />
                <Button 
                    htmlType="button" 
                    type="primary" 
                    size="medium"
                    extraClass="mb-20"
                    onClick={handleClick}
                >
                    Зарегистрироваться
                </Button>
                <p className="text text_type_main-default">
                    Уже зарегистрированы?&nbsp;
                    <Link className={styleReg.text} to="/signin">
                        Войти
                    </Link>
                </p>
                
            </div>
        </>
    )

    
}

export default Register