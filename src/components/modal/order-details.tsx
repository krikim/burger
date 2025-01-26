import OrderLogo from '../../images/order-detail.svg'
import { useAddOrderQuery } from '../../services/api.ts';
import { getBun, getElements, TBun } from '../../services/constrSlice.ts';
import { useSelector } from '../../services/store.ts';

const OrderDetails = () => {
        const elements:Array<TBun> = useSelector(getElements);
        const bun:TBun = useSelector(getBun);
        
        let order:string = ''
        elements.forEach(el => {
          order += '"'+el._id + '",'
        })
        order = '"'+bun._id + '",'+ order+'"'+ bun._id+'"';
        console.log(order);
        const { isLoading, data, isError } = useAddOrderQuery('['+order+']');
        console.log(order);
        let orderItems:any = {}
        if (!isLoading &&!isError && data){ 
           orderItems=data
        }
        
        
  return (
    <> 
      
    {isLoading && 'Загрузка...'}
        {isError && 'Произошла ошибка!'}
        
        {!isLoading && !isError && data.order.number && 
      <>
      <div>
                
      <p className="text text_type_digits-large mt-15">{orderItems.order.number}</p>
      <p className="text text_type_main-medium mt-8 mb-15">Идетификатор заказа</p>
      <img src={OrderLogo} />
      <p className="orderdetail text text_type_main-small mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small mt-2 mb-30">Дождитесь готовности на орбитальной станции</p>
      </div>
      </>
            }
    </>
  )

}

export default OrderDetails