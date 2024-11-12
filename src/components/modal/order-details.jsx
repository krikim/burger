import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './modal.jsx'
import styleOrder from './order-details.module.css'
import OrderLogo from '../../images/order-detail.svg'
import { useAddOrderQuery } from '../../services/api.js';
import { useSelector } from 'react-redux';

const OrderDetails = () => {
        const elements = useSelector(state => state.constr.elements);
        const bun = useSelector(state => state.constr.bun);
        //if (!elements) return null;
        let order = ''
        elements.forEach(el => {
          order += '"'+el._id + '",'
          //  order += el._id + ','
        })
        order = '"'+bun._id + '",'+ order+'"'+ bun._id+'"';
        //order = bun._id + ','+ order+ bun._id;
        console.log(order);
        const { isLoading, data, isError } = useAddOrderQuery('['+order+']');
        console.log(order);
        let orderItems = {}
        if (!isLoading &&!isError && data){ 
           orderItems=data
        }
        
        
  return (
    <> 
      
    {isLoading && 'Загрузка...'}
        {isError && 'Произошла ошибка!'}
        
        {!isLoading && !isError && data.order.number && 
      <>
      <p className="text text_type_digits-large mt-15">{orderItems.order.number}</p>
      <p className="text text_type_main-medium mt-8 mb-15">Идетификатор заказа</p>
      <img src={OrderLogo} />
      <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
      </>
            }
    </>
  )

}

export default OrderDetails