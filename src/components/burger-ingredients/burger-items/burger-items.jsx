import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import styleBurgerItem from './burger-items.module.css'
import PropTypes, { element } from 'prop-types'
import { useDrag } from 'react-dnd'
import { nanoid } from '@reduxjs/toolkit'
import React from 'react'
import { useSelector } from 'react-redux'

const ItemTypeHeader = ({itype,id}) => {
    const what = [{
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
    return (
            <h2 className={styleBurgerItem.header+' text text_type_main-medium mb-6 mt-2'} id={id}>
                {
                    what.find((item)=>itype===item.type).name
                }
            </h2>
    )
            
}
const constructPropTypes = PropTypes.shape({
    _id:PropTypes.string.isRequired,
    name:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    proteins:PropTypes.number.isRequired,
    fat:PropTypes.number.isRequired,
    carbohydrates:PropTypes.number.isRequired,
    calories:PropTypes.number.isRequired,
    price:PropTypes.number.isRequired,
    image:PropTypes.string.isRequired,
    image_mobile:PropTypes.string.isRequired,
    image_large:PropTypes.string.isRequired,
    __v:PropTypes.number.isRequired
  
  })
  
const ItemElement = ({item}) => {
    
    const [, dragRef ] = useDrag(() => ({
        type: 'construct',
        item: item 
    })
)
const elements = useSelector(state=>state.constr.elements);
let count = 0;
console.log(elements.length)
if (elements.length) { 
elements.forEach(element => {
    item._id === element._id && count++
});
} 
console.log(count)  
return (
    <div key={nanoid} draggable ref={dragRef} className={styleBurgerItem.item+' ml-4 mb-8'}>
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
              <Counter count={count} size="small" className={styleBurgerItem.item} />
          </div>     
          
)
}

const ItemType = ({dataItems, itype}) => {
    const bunData = dataItems.filter((item)=>item.type === itype);
    if (bunData.length === 0) return null;
    const itemData = bunData.map(item =><ItemElement key={nanoid()} item={item}/>)
      
return (
            <>
                <div className={styleBurgerItem.component}>
                    {itemData}
                </div>
            </>
    )
}

ItemType.propTypes = {
    dataList: PropTypes.arrayOf(constructPropTypes),
    itype: PropTypes.string.isRequired  
  }
  
const BurgerItems = ({dataItems}) => {

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
BurgerItems.propTypes = {
    dataList: PropTypes.arrayOf(constructPropTypes)
  }
export default BurgerItems