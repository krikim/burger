import {Button, ConstructorElement, CurrencyIcon,DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useEffect, useRef } from 'react';
import styleBC from './burger-constructor.module.css';
//import PropTypes from 'prop-types';
import OrderDetails from '../modal/order-details.jsx';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, moveItem, removeItem, setBun } from '../../services/constrSlice.js';
import { useDrag, useDrop } from'react-dnd';
import {  useGetIngredientsQuery } from '../../services/api';
import {  nanoid } from '@reduxjs/toolkit';

const SummaryElement = ({summ}) => {
    const [show,setShow] = React.useState(false)
    const elements = useSelector(state => state.constr.elements);
    const bun = useSelector(state => state.constr.bun);
    
    
    const handleShowModal = () => {
        
        setShow(!show)
    }
    const handleCloseModal = () => {
        setShow(false)
    }
    return (<div className={styleBC.summary+' p-8'}>
            <span className='text text_type_digits-default pr-2'>
                {summ}
            </span>
            <CurrencyIcon className='mr-10'/>
            <Button htmlType="button" type="primary" size="small" extraClass="text text_type_digits-small ml-4 p-4" onClick={handleShowModal}>
                Оформить заказ
            </Button>
            <Modal
                    show={show}
                    header='Состав заказа'
                    handleModalClose={handleCloseModal}
            >
                <OrderDetails orderItems=''  />
            </Modal>
        </div>)
}

/* SummaryElement.propTypes = {
    summ: PropTypes.number
}

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
const HeadElement = ({bun}) => {
        return (
        <div className={styleBC.construct+' ml-6 mb-4 mt-25'}>
        <ConstructorElement
          key={nanoid()}
          type="top"
          isLocked={true}
          text={bun.name+' (верх)'}
          price={bun.price}
          thumbnail={bun.image}
          extraClass='pt-4 pb-4 pl-6 pr-8'
      />
      </div>)
    }

const ScrollBoxElement=({item,index,id}) =>{ 
            const dispatch = useDispatch();
            
            const handleShowModalItem = (e) => {
                console.log(e.target.type)
                const rect = e.target.getBoundingClientRect();
                console.log('rect', rect)   
                if (e.target.className === 'constructor-element__action pr-2'||e.target.className === 'constructor-element__price'||(rect.width===18&&rect.height<21)) {
                        dispatch(removeItem(item.key));
                 }
            }

            const [{ handlerId }, drop] = useDrop({
              accept: 'change',
              collect(monitor) {
                return {
                  handlerId: monitor.getHandlerId(),
                }
              },
              drop: (item, monitor) => {
                if (index===item.index) return
                dispatch(moveItem({'from':item.index, 'to':index}))
                console.log('drop', item.index, index)
                
            }
            })
            const [{ isDragging }, drag] = useDrag({
              type: 'change',
              item: () => {
                return { id, index }
              },
              collect: (monitor) => ({
                isDragging: monitor.isDragging(),
              }),
            })
            console.log('drag', isDragging)
            return(
                <>
                <div ref={drop}>
                <div ref={drag} key={nanoid()} draggable className={styleBC.construct+' mb-4'}  onClick={handleShowModalItem} index={index} data-handler-id={handlerId}>
                <DragIcon type="primary" key={'DI'+item._id} />
                <ConstructorElement
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    extraClass='pt-4 pb-4 pl-6 pr-8'
                />
                </div>
                </div>
                </>
                
                )
}
        
/* 
ScrollBoxElement.propTypes = {
    dataList: PropTypes.arrayOf(constructPropTypes)
    
}
 */
const BottomElement = ({bun}) => {
    return (
                    <ConstructorElement
                        key={nanoid()}
                        type="bottom"
                        isLocked={true}
                        text={bun.name+' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='pt-4 pb-4 pl-6 pr-8'
                    />
                    
    )        
}

//BottomElement.propTypes ={
   // bun : constructPropTypes
//}

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { isLoading, data, isError } = useGetIngredientsQuery();
    if(isLoading) return null;
    if(isError) return <div>Ошибка загрузки ингредиентов</div>;
    
   //// useMemo(()=>{
    //    dispatch(setIngredients(data.data))
   // },[]);
    
    const [,drop ] = useDrop({
        accept: 'construct',
        drop(item){
            if (item.type==='bun') {
                dispatch(setBun(item))
            }else{
                if (!item.inElement) {
                    dispatch(addItem(item)) 
                } 
           
            }
        },
          
        });
       
    const dataItems = data.data;
    if(!dataItems.length) return null;
    
    //const bunItem = useMemo(() => {
      //  const bun = dataItems.find((item)=>item.type==='bun')
        //dispatch(setBun(bun))
        //return bun
    //}, [dataItems]  );
    
    const bun = useSelector(state => state.constr.bun);
    const elements = useSelector(state => state.constr.elements);
        
    const summ = useMemo(() => {
        if (!elements.length) return bun.price*2;
        return elements.reduce((acc, item) => acc + item.price, 0) + bun.price*2
    }, [elements,bun] );

    const box = useMemo(() => {
        console.log('elements', elements);
        return (elements.map( (item,index) => {
            return( 
                <ScrollBoxElement key={item.key} item={item} index={index} id={item._id}/>
            )
        })
    )}, [elements])
    return (
        <>
            <section className={styleBC.section+' ml-10 p-4'}>
                    <HeadElement bun={bun} />
                    <div className={styleBC.scrollbox+' p-0 m-0 ml-4'} draggable ref={drop} >
                        {box}
                    </div>     
                    <div className={styleBC.construct+' ml-6 mb-4 mt-4'}>
                        <BottomElement bun={bun}/>
                    </div>
                    <div className={styleBC.summary+' mt-6'}>
                        <SummaryElement summ={summ}/>
                     </div>
            
            </section>
        </>
    )
}
export default BurgerConstructor
