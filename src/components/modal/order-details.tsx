import OrderLogo from '../../images/order-detail.svg'
//@ts-ignore
import { useAddOrderQuery } from '../../services/api.js';
import { useSelector } from 'react-redux';

interface IconstructPropTypes {
  _id:string,
  name:string,
  type:string,
  proteins:number,
  fat:number,
  carbohydrates:number,
  calories:number,
  price:number,
  image:string,
  image_mobile:string,
  image_large:string,
  __v:number,
  inElement?:boolean|null,
  key?:string

}



const OrderDetails = () => {
        const elements:Array<IconstructPropTypes> = useSelector((state:any) => state.constr.elements);
        const bun:IconstructPropTypes = useSelector((state:any) => state.constr.bun);
        //if (!elements) return null;
        let order:string = ''
        elements.forEach(el => {
          order += '"'+el._id + '",'
          //  order += el._id + ','
        })
        order = '"'+bun._id + '",'+ order+'"'+ bun._id+'"';
        //order = bun._id + ','+ order+ bun._id;
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