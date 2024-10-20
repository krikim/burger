import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import dataItems from '../../../utils/data.js'
import styleBurgerItem from './burger-items.module.css'

function ItemTypeHeader(props) {
    const what = [{type:"bun",name:"Булки"},{type:"sauce",name: "Соусы"},{type:"main",name:"Начинки"}]
    return (
            
            <h2 className={styleBurgerItem.header+' text text_type_main-medium p-4'}>{what.find((item)=>props.itype===item.type).name}</h2>
    )
            
}

function ItemType (props) {
    const bunData = dataItems.filter((item)=>item.type === props.itype);
    return (
            <>
                <div className={styleBurgerItem.component}>
                    
                {bunData.map(function(item){
                      return (
                        <>
                        <div key={item._id} className={styleBurgerItem.item}>
                            <img src={item.image}/>
                            <span className={styleBurgerItem.component}>
                            <p className='text text_type_digits-default'>
                                {item.price}
                            </p>
                            <CurrencyIcon className='pl-2'/>
                            </span>
                            
                            <p className='text text_type_main-small'>
                                {item.name}
                            </p>
                        </div>     
                        <Counter count={1} size="small" className={styleBurgerItem.item} />
                        
                        </>
                
                        )
                    }
                    )
                }
                </div>
            </>
    )
}

function BurgerItems(){
    return (
        <>
            <ItemTypeHeader itype='bun' />
            <ItemType itype='bun' />
            <ItemTypeHeader itype='sauce' />
            <ItemType itype='sauce' />
            <ItemTypeHeader itype='main' />
            <ItemType itype='main' />
        </>
    )
}

export default BurgerItems