import { EmailInput,PasswordInput,Button, Input } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Navigate } from "react-router-dom"
import styleReg from "./register.module.css"
import { register } from "../services/api.ts"
import { setUser, TUser } from "../services/userSlice.ts"
import { FormEvent, useRef } from "react"
import { useDispatch } from "../services/store.ts"
const Register = () => {
    const dispatch = useDispatch()
    const form = useRef<HTMLFormElement|null>(null)
        
    const handleClick = (e:FormEvent) => {
        e.preventDefault()
        if (form.current!== null){
            const iForm = Array.from(form.current.elements) as HTMLInputElement[];
            
            const email=iForm[0].value
            const pass=iForm[1].value
            const name = iForm[2].value
            console.log('cred:', email, pass)
            register({ email, pass, name })
                .then((res: Response) => {
                    if (res.ok) {
                        return res.json()

                    } else {
                        console.log('error');

                    }
                })
                .then((res: { user: TUser, refreshToken: string, accessToken: string }) => {
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