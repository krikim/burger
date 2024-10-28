import React from 'react';
import PropTypes from 'prop-types';
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import styleBI from './burger-ingridients.module.css'
import BurgerItems from './burger-items/burger-items';

function SelectTab(){
        const [current, setCurrent] = React.useState('one')
        return (
          <div  className={styleBI.tab+' mb-8'}>
            <Tab value="one" active={current === 'one'} onClick={setCurrent}>
              Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={setCurrent}>
              Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={setCurrent}>
              Начинки
            </Tab>
          </div>
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

function BurgerIngredients ({dataItems}){
    return (
        <section className={styleBI.section}>
            <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
            <SelectTab/>
            <div className={styleBI.scrollbox}>
                <BurgerItems dataItems={dataItems}/>
            </div>
        </section>
    )
}
BurgerIngredients.propTypes = {
  dataList: PropTypes.arrayOf(constructPropTypes)
  
}
export default BurgerIngredients;