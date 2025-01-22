import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import styleBurgerItem from './burger-items.module.css'
import { useDrag } from 'react-dnd'
import { useLocation,Link } from 'react-router-dom'
import { getElements, TBun } from '../../../services/constrSlice'

import { nanoid, } from '@reduxjs/toolkit'
import { useSelector } from '../../../services/store'

// ... previous code remains the same
const ItemTypeHeader = ({itype, id}: TItemHead) => {
    const what:Array<{type:string,name:string}> = [{
                    type:"bun",
                    name:"Булки"
                },
                {
                    type:"sauce",
                    name: "Соусы"
                },
                {
                    type:"main",
                    name:"Начинки"
                }]

    
    const itemType = what.find((item) => item.type === itype);
    if (!itemType) {
        throw new Error(`Invalid itype: ${itype}`);
    }
    return (
            <h2 className={styleBurgerItem.header+' text text_type_main-medium mb-6 mt-2'} id={id}>
                {itemType.name}
            </h2>
    )
}



type TItemHead = {
    itype:string;
    id: string
}



  interface IIElement {
    item:TBun;
  }
const ItemElement = ({item}:IIElement) => {
   
    const [, dragRef ] = useDrag(() => ({
        type: 'construct',
        item: item 
    })
)
const elements = useSelector(getElements);
let count:number = 0;
//console.log(elements.length)
if (elements.length) { 
elements.forEach(element => {
    item._id === element._id && count++
});
} 
const location = useLocation();
const itemId = item._id
let className:string = styleBurgerItem.item;
//console.log(count)  
return (
    <Link
        key={itemId}
        // Тут мы формируем динамический путь для нашего ингредиента
        to={`/items/${itemId}`}
        // а также сохраняем в свойство background роут,
        // на котором была открыта наша модалка
        state={{ background: location }}
        className={styleBurgerItem.link}
        item = {item}
    >
    <div key={nanoid()} draggable ref={dragRef} className={styleBurgerItem.item as string +' ml-4 mb-8'} >
              <img className='ml-4 mb-1' src={item.image}/>
              <span className={styleBurgerItem.component}>
                  <p className='text text_type_digits-default'>
                      {item.price}
                  </p>
                  <CurrencyIcon className='pl-2'/>
              </span>
              
              <p className='text text_type_main-small mt-1'>
                  {item.name}
              </p>
              <Counter count={count} size="small" className={ className } />
                
          </div>   
          </Link>  
          
)
}
const ItemType = ({dataItems, itype}: IItemType) => {
    //console.log(dataItems)
    const bunData = Array.from(dataItems).filter((item:TBun)=>item.type === itype);
    if (bunData.length === 0) return null;
    const itemData = bunData.map((item:TBun) =><ItemElement key={nanoid()}  item={item} />)
      
return (
            <>
                <div id={nanoid()} className={styleBurgerItem.component}>
                    {itemData}
                </div>
            </>
    )
}

interface IItemType extends IBurgerItems  {
    itype: string;  
  } 
const BurgerItems = ({dataItems}:IBurgerItems) => {
    console.log(dataItems);
    return (
        <>
            <ItemTypeHeader itype='bun' id='itemBunId' />
            <ItemType key= {1} itype='bun'  dataItems={dataItems}/>
            <ItemTypeHeader itype='sauce'  id='itemSauceId' />
            <ItemType key = {2} itype='sauce' dataItems={dataItems}/>
            <ItemTypeHeader itype='main' id='itemMainId' />
            <ItemType key={3} itype='main'  dataItems={dataItems}/>
        </>
    )
}
interface IBurgerItems  {
    dataItems: TBun[];
  }
export default BurgerItems