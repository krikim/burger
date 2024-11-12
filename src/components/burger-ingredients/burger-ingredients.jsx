import React,{useMemo} from 'react';
//import PropTypes from 'prop-types';
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import styleBI from './burger-ingridients.module.css'
import BurgerItems from './burger-items/burger-items';
import { useGetIngredientsQuery } from '../../services/api';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { useDispatch, useSelector } from'react-redux'
import { setTab } from '../../services/ingredientSlice';

const SelectTab = () =>{
        const current = useSelector(state => state.ingredient.currentTab);
        const dispatch = useDispatch();
        const handleClick = (e) => {
          dispatch(setTab(e.target.value));
        }
        return (
          <div  className={styleBI.tab+' mb-8'} id='tabId'>
            <Tab value="one" active={current === 'one'} onClick={handleClick}>
              Булки
            </Tab>
            <Tab value="two" active={current === 'two'} onClick={handleClick}>
              Соусы
            </Tab>
            <Tab value="three" active={current === 'three'} onClick={handleClick}>
              Начинки
            </Tab>
          </div>
        )
    
}
/* 
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
 */
const BurgerIngredients = () => {
  const { isLoading, data, isError } = useGetIngredientsQuery();
  const dispatch = useDispatch();
  //!isLoading&&!isError&&data.data.length&&dispatch(setIngredients(data.data));
  
  //const burger = useMemo(() => {<BurgerItems dataItems={data.data} />}, [data,elements]);
  const elements = useSelector(state => state.constr.elements);
  const burger = useMemo(() => (!isLoading&&!isError&&data.data.length&&<BurgerItems dataItems={data.data} />), [data,elements]);
  const handleScroll = (e) => {
    let itemBunHead=document.getElementById('itemBunId')
    let itemSauceHead=document.getElementById('itemSauceId')
    let itemMainHead=document.getElementById('itemMainId')
    let tabId=document.getElementById('tabId')
    
    let rectTab = tabId.getBoundingClientRect();
    let rectMain = itemMainHead.getBoundingClientRect();
    let rectBun = itemBunHead.getBoundingClientRect();
    let rectSauce = itemSauceHead.getBoundingClientRect();
    
    console.log(rectBun.top+':'+rectSauce.top+':'+rectMain.top+':'+rectTab.bottom)
    
    if(rectBun.top-rectTab.bottom<30){
      dispatch(setTab('one'))
    }
    if(rectSauce.top-rectTab.bottom<30){
      dispatch(setTab('two'))
    }
    if(rectMain.top-rectTab.bottom<30){
      dispatch(setTab('three'))
  }
  


  }
  return (
    <>
        {isLoading && 'Загрузка...'}
        {isError && 'Произошла ошибка!'}
        
        {!isLoading && !isError && data.data.length && 
          <>
          <section className={styleBI.section}>
          <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
          <SelectTab />
        
          <div className={styleBI.scrollbox} onScroll={handleScroll}>
          
          {burger}
          </div>
          </section>
          <BurgerConstructor/>
          </>
        }
       </> 
     )
}
/* BurgerIngredients.propTypes = {
  dataItems: PropTypes.arrayOf(constructPropTypes)

} */
export default BurgerIngredients