import {Logo,BurgerIcon, ListIcon, ProfileIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import navStyle from './app-header.module.css';
import {  NavLink } from 'react-router-dom';

function AppHeader () {
    const menuItemStyle:string|null = navStyle.nav+' text text_type_main-small p-5 mr-2';
    return (
                    <>
                        <nav className={navStyle.nav+' pb-4 pt-4'}>
                            <NavLink
                                to="/"
                                className={({isActive}) => isActive ?menuItemStyle+' '+navStyle.active : menuItemStyle}
                            >
                                <BurgerIcon type="primary" className='mr-2'/>
                                 <span>
                                    Конструктор
                                </span>
                            </NavLink>
                            <NavLink
                                to="/feed"
                                className={({isActive}) => isActive ?menuItemStyle+' '+navStyle.active : menuItemStyle}
                            >
                                <ListIcon type="primary" className='mr-2' />
                                <span>
                                    Лента заказов
                                </span>
                            </NavLink>
                            <Logo/>
                            <NavLink
                                to="/profile"
                                className={({isActive}) => isActive ?menuItemStyle+' '+navStyle.active : menuItemStyle}
                            >
                                <ProfileIcon type='primary' />
                                <span>
                                    Личный кабинет
                                </span>
                            </NavLink>
                        </nav>
                    </>
    )
}

export default AppHeader;