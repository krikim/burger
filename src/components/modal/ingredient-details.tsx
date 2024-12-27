import React from 'react';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import styleID from './ingredient-details.module.css'
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useGetIngredientsQuery } from '../../services/api';


const IngredientDetails = () => {
        const { isLoading, data, isError } = useGetIngredientsQuery();
        
        //const ingredients = []
       //const ingredients = useSelector(state=>state.ingredient.ingredients);
        //if (ingredients.length === 0) return
        const location = useLocation();
       const id = location.pathname.split('/')[2];
       // console.log('i:',ingredients)
       let ingredientItem={}
       if (!isLoading&&!isError&&data.data.length){
       ingredientItem=data.data.find(item=>id===item._id)
       }
  
        //const ingredientItem = item;
        //const ingredientItem = ingredients.filter((item)=>{
        //       console.log(item._id,id)
        //       item._id !== id}
        //);
        console.log('location:',location)
        let header = '';
        let iName = "text text_type_main-medium mt-4";
        let main = '';
        if (location.state===null){
                 header = 'Детали ингредиента';
                 iName = styleID.name+" text text_type_main-medium mt-4 ";
                 main = styleID.main;
        }


        return (
                <>
                 {isLoading && 'Загрузка...'}
                {isError && 'Произошла ошибка!'}
        
                {!isLoading && !isError && ingredientItem && 
                        <> 
                <div className={main}>
                <p className='text text_type_main-large ml-10' > {header}</p>
                
                <img className={styleID.img} src={ingredientItem.image} />
                        <p className={iName}>{ingredientItem.name}</p>
                        <span className={styleID.details+' mb-15 mt-8'}>
                                <span className={styleID.detailsItem+' mr-5'}>
                                        <span className="text text_type_main-small">
                                                Калории, ккал
                                        </span>
                                        <span className='text text_type_digits-default mt-2'>
                                                {ingredientItem.calories}
                                        </span>
                                </span>
                                <p className={styleID.detailsItem+' mr-5'}>
                                        <span className="text text_type_main-small">
                                                Белки, г
                                        </span>
                                        <span className='text text_type_digits-default mt-2'>
                                                {ingredientItem.proteins}
                                        </span>
                                </p>
                                <p className={styleID.detailsItem+' mr-5'}>
                                        <span className=" text text_type_main-small">
                                                Жиры, г
                                        </span>
                                        <span className='text text_type_digits-default mt-2'>
                                                {ingredientItem.fat}
                                        </span>
                                </p>
                                <p className={styleID.detailsItem}>
                                        <span className="text text_type_main-small">
                                                Углеводы, г
                                        </span>
                                        <span className='text text_type_digits-default mt-2'>
                                                {ingredientItem.carbohydrates}
                                        </span>
                                </p>
                        </span>
                        </div>
                        </>
                       }
                       </>
                       
        )

}

export default IngredientDetails