import React from 'react';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from './modal.jsx'
import styleOrder from './order-details.module.css'
import OrderLogo from '../../images/order-detail.svg'


const OrderDetails = ({ orderItems }) => {

  return (
      <>
      <p className="text text_type_digits-large mt-15">034536</p>
      <p className="text text_type_main-medium mt-8 mb-15">Идетификатор заказа</p>
      <img src={OrderLogo} />
      <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
    </>
  )

}

export default OrderDetails