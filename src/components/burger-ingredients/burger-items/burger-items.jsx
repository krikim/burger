import {Counter, CurrencyIcon}  from '@ya.praktikum/react-developer-burger-ui-components'
import styleBurgerItem from './burger-items.module.css'
import PropTypes from 'prop-types'

const ItemTypeHeader = ({itype}) => {
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
            <h2 className={styleBurgerItem.header+' text text_type_main-medium mb-6 mt-2'}>
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
  
  
const ItemType = ({dataItems, itype}) => {
    const bunData = dataItems.filter((item)=>item.type === itype);
    const itemData = bunData.map(item =>
          <div key={item._id} className={styleBurgerItem.item+' ml-4 mb-8'}>
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
              <Counter count={1} size="small" className={styleBurgerItem.item} />
          </div>     
          )
      
      

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
            <ItemTypeHeader itype='bun' />
            <ItemType key= {1} itype='bun' dataItems={dataItems}/>
            <ItemTypeHeader itype='sauce' />
            <ItemType key = {2} itype='sauce' dataItems={dataItems}/>
            <ItemTypeHeader itype='main' />
            <ItemType key={3} itype='main' dataItems={dataItems}/>
        </>
    )
}
BurgerItems.propTypes = {
    dataList: PropTypes.arrayOf(constructPropTypes)
  }
export default BurgerItems