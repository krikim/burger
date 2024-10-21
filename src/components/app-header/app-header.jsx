import {Logo,BurgerIcon, ListIcon, ProfileIcon, Button,}  from '@ya.praktikum/react-developer-burger-ui-components';
import navStyle from './app-header.module.css';

function AppHeader () {
    const menuItemStyle = 'text text_type_main-small';
    return (
                    <>
                        <nav className={navStyle.nav+' pb-4 pt-4'}>
                            <Button htmlType="button" type="secondary" size="medium" extraClass={navStyle.nav+' text text_type_main-small p-5 mr-2'}>
                                <BurgerIcon type="primary" className='mr-2'/>
                                 <span>
                                    Конструктор
                                </span>
                            </Button>
                            <Button htmlType="button" type="secondary" size="medium" extraClass={navStyle.nav+' text text_type_main-small p-5 mr-15'}>
                                <ListIcon type="primary" className='mr-2' />
                                <span>
                                    Лента заказов
                                </span>
                            </Button>
                            <Logo/>
                            <Button htmlType="button" type="secondary" size="medium" extraClass={navStyle.nav+' text text_type_main-small p-5 ml-15'}>
                                <ProfileIcon type='primary' />
                                <span>
                                    Личный кабинет
                                </span>
                            </Button>
                        </nav>
                    </>
    )
}

export default AppHeader;