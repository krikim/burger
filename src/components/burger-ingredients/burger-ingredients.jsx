import React from 'react';
import {Tab}  from '@ya.praktikum/react-developer-burger-ui-components';
import styleBI from './burger-ingridients.module.css'
import BurgerItems from './burger-items/burger-items';

function SelectTab(){
        const [current, setCurrent] = React.useState('one')
        return (
          <div style={{ display: 'flex' }}>
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

function BurgerIngredients (){
    return (
        <section className={styleBI.section}>
            <h2 className='text text_type_main-large mt-4 mb-4'>Соберите бургер</h2>
            <SelectTab/>
            <div className={styleBI.scrollbox}>
                <BurgerItems/>
            </div>
        </section>
    )
}

export default BurgerIngredients;