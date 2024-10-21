import {Button, ConstructorElement, CurrencyIcon,DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styleBC from './burger-constructor.module.css'
import dataItems from '../../utils/data';

function SummaryElement(props){
    return (
        <div className={styleBC.summary+' p-8'}>
            <span className='text text_type_digits-default pr-2'>{props.summ}</span><CurrencyIcon className='mr-10'/><Button htmlType="button" type="primary" size="small" extraClass="text text_type_digits-small ml-4 p-4">Оформить заказ</Button>
        </div>
    )
}

function BurgerConstructor(){
    const dataList = dataItems.filter((item)=>item.type==='main'||item.type==='sauce')
    const bun= dataItems.find((item)=>item.type==='bun')
    let summ = bun.price;
    return (
        <>
            <section className={styleBC.section+' ml-10 p-4'}>
                    <div className={styleBC.construct+' ml-6 mb-4 mt-25'}>
                      <ConstructorElement
                        key={bun._id}
                        type="top"
                        isLocked={true}
                        text={bun.name+' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='pt-4 pb-4 pl-6 pr-8'
                    />
                    </div>
                    <div className={styleBC.scrollbox+' p-0 m-0 ml-4'}>
            
                        {
                            dataList.map(function(item){
                             summ+=item.price;
                             return(
                                <div className={styleBC.construct+' mb-4'}>
                                <>
                                <DragIcon type="primary" />
                                <ConstructorElement
                                    key={item._id}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    extraClass='pt-4 pb-4 pl-6 pr-8'
                                />
                                </>
                                </div>

                                )
                            }
                            )
                         }
                    </div>     
                    <div className={styleBC.construct+' ml-6 mb-4 mt-4'}>
                    <ConstructorElement
                        key={bun._id+'abc'}
                        type="bottom"
                        isLocked={true}
                        text={bun.name+' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='pt-4 pb-4 pl-6 pr-8'
                    />
                    </div>
                    <div className={styleBC.summary+' mt-6'}>
                        <SummaryElement summ={summ} />
                    </div>
            </section>
        </>
    )
}

export default BurgerConstructor