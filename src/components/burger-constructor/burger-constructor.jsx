import {ConstructorElement}  from '@ya.praktikum/react-developer-burger-ui-components';
import styleBC from './burger-constructor.module.css'
import dataItems from '../../utils/data';

function BurgerConstructor(){
    const dataList = dataItems.filter((item)=>item.type==='main'||item.type==='sauce')
    const bun= dataItems.find((item)=>item.type==='bun')
    
    return (
        <>
            <section className={styleBC.section+' ml-15'}>
                    <ConstructorElement
                        key={bun._id}
                        type="top"
                        isLocked={true}
                        text={bun.name+' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        className='mb-2'
                    />
                    <div className={styleBC.scrollbox}>
            
                        {
                            dataList.map(function(item){

                             return(
                                <ConstructorElement
                                    key={item._id}
                                    text={item.name}
                                    price={item.price}
                                    thumbnail={item.image}
                                    className='mt-2'
                                />

                                )
                            }
                            )
                         }
                    </div>     
                    <ConstructorElement
                        key={bun._id+'abc'}
                        type="bottom"
                        isLocked={true}
                        text={bun.name+' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        className='mt-2'
                    />
          
            </section>
        </>
    )
}

export default BurgerConstructor