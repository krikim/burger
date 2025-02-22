import { useMemo} from 'react';
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import styleBI from './burger-ingridients.module.css'
import BurgerItems from './burger-items/burger-items';
import { useGetIngredientsQuery } from '../../services/api.ts';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { setIngredients, setTab } from '../../services/ingredientSlice.ts';
import { getElements, TBun } from '../../services/constrSlice.ts';
import { useDispatch, useSelector } from '../../services/store.ts';

const SelectTab = () =>{
        const current = useSelector((state:any) => state.ingredient.currentTab);
        const dispatch = useDispatch();
        const handleClick = (value:string) => {
          dispatch(setTab(value));
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

type TIQuery = {
  isLoading?: boolean;
  isError?: boolean;
  data?: {
    data: Array<TBun>
  }
}
const BurgerIngredients = () => {
  const { isLoading, data, isError }:TIQuery = useGetIngredientsQuery(undefined);
  const dispatch = useDispatch();
  //!isLoading&&!isError&&data.data.length&&dispatch(setIngredients(data.data));
  
  //const burger = useMemo(() => {<BurgerItems dataItems={data.data} />}, [data,elements]);
  const elements = useSelector(getElements);
  !isLoading&&!isError&&data&&data.data.length&&dispatch(setIngredients(data.data))
  
  const burger = useMemo(() => !isLoading&&!isError&&data&&data.data.length&&<BurgerItems  dataItems={ data.data } />
  , [data,elements]);
  const handleScroll = () => {

    let itemBunHead:HTMLElement|null=document.getElementById('itemBunId')
    let itemSauceHead:HTMLElement|null=document.getElementById('itemSauceId')
    let itemMainHead:HTMLElement|null=document.getElementById('itemMainId')
    let tabId:HTMLElement|null=document.getElementById('tabId')
    
    if ((tabId)&&(itemBunHead)&&(itemSauceHead)&&(itemMainHead)){
    let rectTab:DOMRect = tabId.getBoundingClientRect();

    let rectMain:DOMRect = itemMainHead.getBoundingClientRect();
    let rectBun:DOMRect = itemBunHead.getBoundingClientRect();
    let rectSauce:DOMRect = itemSauceHead.getBoundingClientRect();

    //console.log(rectBun.top+':'+rectSauce.top+':'+rectMain.top+':'+rectTab.bottom)

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
  }
  return (
    <>
        {isLoading && 'Загрузка...'}
        {isError && 'Произошла ошибка!'}
        
        {!isLoading && !isError && data && data.data.length && 
          <>
          <section className={styleBI.section}>
          <h2 className='text text_type_main-large mt-10 mb-5'>Соберите бургер</h2>
          <SelectTab />
        
          <div className={styleBI.scrollbox} onScroll={handleScroll} data-test-id="ingreds">
          
          {burger}
          </div>
          </section>
          <BurgerConstructor/>
          </>
        }
       </> 
     )
}

export default BurgerIngredients