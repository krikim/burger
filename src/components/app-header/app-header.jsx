import {Logo,BurgerIcon, ListIcon, ProfileIcon,}  from '@ya.praktikum/react-developer-burger-ui-components';
import navStyle from './app-header.module.css';

function AppHeader () {
    const menuItemStyle = 'text text_type_main-small';
    return (
                    <>
                        <nav className={navStyle.nav}>
                            <BurgerIcon type="primary" className='mr-2'/>
                            <span className='text text_type_main-small pr-4'>
                                Конструктор
                            </span>
                            <ListIcon type="primary" className='mr-2' />
                            <span className='text text_type_main-small mr-15'>
                                Лента заказов
                            </span>
                            <Logo/>
                            <ProfileIcon type='primary' className='ml-15 pl-4 mr-2'/>
                            <span className='text text_type_main-small'>Личный кабинет</span>
                        </nav>
                    </>
    )
}

export default AppHeader;