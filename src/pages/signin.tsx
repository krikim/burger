import { EmailInput,PasswordInput,Button } from "@ya.praktikum/react-developer-burger-ui-components"
import { Link, Location, NavigateFunction, useNavigate } from "react-router-dom"
import styleSI from "./signin.module.css"
import { signIn } from "../services/api.ts"
import { useLocation } from "react-router-dom";
import { setAuth, setUser, TUser } from "../services/userSlice.ts";
import {  FormEvent, useRef } from "react";
import { useDispatch } from "../services/store.ts";

const SignIn = () => {

    const dispatch = useDispatch()
    const location:Location = useLocation()
    const navigate:NavigateFunction = useNavigate()
    const form = useRef<HTMLFormElement|null>(null)
    
    
    const handleClick = (e: FormEvent) => {
        e.preventDefault()
        console.log('cred:', form)
        if (form.current !== null) {
            const iForm = Array.from(form.current.elements) as HTMLInputElement[];

            const email = iForm[0].value
            const pass = iForm[1].value

            console.log('cred:', email, pass)
            signIn({ email, pass })
                .then((res: Response) => {
                    if (res.ok) {
                        return res.json();

                    } else {
                        console.log('error');

                    }
                })
                .then((data: { user: TUser; accessToken: string; refreshToken: string }) => {
                    dispatch(setUser(data.user))
                    dispatch(setAuth(true))
                    localStorage.setItem('accessToken', data.accessToken)
                    localStorage.setItem('refreshToken', data.refreshToken)
                })




            const { from } = location.state || { from: { pathname: '/' } }
            navigate(from);
        }
    }
    
    return (

            <>
            <form ref={form} onSubmit={handleClick}>
            <div className={styleSI.wrapper}>
                <p className="text text_type_main-medium mb-6">
                        Вход
                </p>

                <EmailInput
                    name='emailLogin'
                    placeholder="Email"
                    extraClass="mb-6"
                    
                />
                <PasswordInput
                    name={'emailPass'}
                    extraClass="mb-6"
                

                />
                <Button 
                    htmlType="submit" 
                    type="primary" 
                    size="medium"
                    extraClass="mb-20"

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
            </form>
        </>
    )

    
}

export default SignIn