import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/modal.jsx'
import styleID from './ingredient-details.module.css'


const IngredientDetails = ({ ingredientItem, show, handleModalClose }) => {

        return (
                <Modal
                        show={show}
                        handleModalClose={handleModalClose}
                >
                        <span className={styleID.header + ' mt-10'} onClick={handleModalClose} >
                                <p className='text text_type_main-large ml-10' >Детали ингридиента</p>
                                <span className={styleID.close+' mr-10'}><CloseIcon type="primary" /></span>
                        </span>
                        <img src={ingredientItem.image} />
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
                </Modal>
        )

}

export default IngredientDetails