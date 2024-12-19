import { EmailInput,PasswordInput,Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate } from "react-router-dom"
import styleReg from "./register.module.css"
import { useDispatch } from "react-redux"
//@ts-ignore
import { register } from "../services/api"
//@ts-ignore
import { setUser } from "../services/userSlice"
import { FormEvent, useRef } from "react"
const Register = () => {
    const dispatch = useDispatch()
    const form = useRef<any>()
        
    const handleClick = (e:FormEvent) => {
        e.preventDefault()
        const email=form.current[0].value
        const password=form.current[1].value
        const name = form.current[2].value
        console.log('cred:',email,password)
        register({email,password,name})
        .then((res:Response)=>{
            if (res.ok){
                return res.json()
                 
            }else{
                console.log('error');
                
            }
        })
        .then((res:{user:string,refreshToken:string,accessToken:string})=>{
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
                <form ref={form} onSubmit={handleClick}>
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
                    htmlType="submit" 
                    type="primary" 
                    size="medium"
                    extraClass="mb-20"
                    
                >
                    Зарегистрироваться
                </Button>
                </form>
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