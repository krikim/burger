import React from 'react';
import { } from '@ya.praktikum/react-developer-burger-ui-components';
import styleID from './ingredient-details.module.css'
import { useSelector } from 'react-redux';


const IngredientDetails = () => {

        const ingredientItem = useSelector(state => state.current.ingredient);
        return (
                <>       
                <img className={styleID.img} src={ingredientItem.image} />
                        <p className="text text_type_main-medium mt-4">{ingredientItem.name}</p>
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
                        </>
        )

}

export default IngredientDetails