import {Button, ConstructorElement, CurrencyIcon,DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useMemo, useEffect, useRef } from 'react';
import styleBC from './burger-constructor.module.css';
import PropTypes from 'prop-types';
import OrderDetails from '../modal/order-details.jsx';
import IngredientDetails from '../Modal/ingredient-details.jsx';
import Modal from '../modal/modal.jsx';
import { useSelector, useDispatch } from 'react-redux';
import { addItem, moveItem, removeItem, setBun } from '../../services/constrSlice.js';
import { useDrag, useDrop } from'react-dnd';
import {  useGetIngredientsQuery } from '../../services/api';
import {  nanoid } from '@reduxjs/toolkit';
import { setIngredient } from '../../services/currentIngredientSlice.js';

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

SummaryElement.propTypes = {
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
            const ref = useRef(null)
        
            const [showItem,setShowItem] = React.useState(false)
            const handleCloseModalItem = () => {
                setShowItem(false)
            }
            const handleShowModalItem = (e) => {
                console.log(e.target.type)
                if (e.target.className === 'constructor-element__action pr-2'||e.target.className === 'constructor-element__price') {
                        dispatch(removeItem(item.key));
                        
                }else {
                dispatch(setIngredient(item))
                setShowItem(!showItem)
                }
            }

            const [{ handlerId }, drop] = useDrop({
              accept: 'change',
              collect(monitor) {
                return {
                  handlerId: monitor.getHandlerId(),
                }
              },
             // hover(item, monitor) {
                //if (!ref.current) {
                  //return
                //}
                //console.log('dragIndex', dragIndex, 'hoverIndex', hoverIndex)
               // const dragIndex = item.index
                //const hoverIndex = index
                //console.log('dragIndex', dragIndex, 'hoverIndex', hoverIndex)
                // Don't replace items with themselves
                //if (dragIndex === hoverIndex) {
                 // return
                //}
                // Determine rectangle on screen
                //const hoverBoundingRect = ref.current?.getBoundingClientRect()
                // Get vertical middle
                //const hoverMiddleY =
                 // (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
                // Determine mouse position
                //const clientOffset = monitor.getClientOffset()
                // Get pixels to the top
                //const hoverClientY = clientOffset.y - hoverBoundingRect.top
                // Only perform the move when the mouse has crossed half of the items height
                // When dragging downwards, only move when the cursor is below 50%
                // When dragging upwards, only move when the cursor is above 50%
                // Dragging downwards
                //if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                 // return
                //}
                // Dragging upwards
                //if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                 // return
                //}
                // Time to actually perform the action
                //dispatch(moveItem({'from':dragIndex, 'to':hoverIndex}))
                // Note: we're mutating the monitor item here!
                // Generally it's better to avoid mutations,
                // but it's good here for the sake of performance
                // to avoid expensive index searches.
                //item.index = hoverIndex
             // },
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
           // const opacity = isDragging ? 0 : 1
            //drag(drop(ref))
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
                <Modal
                        show={showItem}
                        header='Детали ингридиента'
                        handleModalClose={handleCloseModalItem}                
                >
                    <IngredientDetails/>
                </Modal>
                </div>
                </div>
                </>
                
                )
}
        

ScrollBoxElement.propTypes = {
    dataList: PropTypes.arrayOf(constructPropTypes)
    
}

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

BottomElement.propTypes ={
    bun : constructPropTypes
}

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
            //console.log('drop', item, 'type:', type);
             // if (item.type === 'construct') {
                if (!item.inElement) {
                    dispatch(addItem(item)) 
                } //else dispatch(moveItem({"from":item.index, "to":index}))
                

            //    return
            //  }  
              
            }
        },
        /*hover(item, monitor) {
            //if (!ref.current) {
              //return
            //}
            const dragIndex = item.index
            const hoverIndex = index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
              return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    } */
          
        });
       
    //const dataItems = useSelector(state => state.ingredient.ingredients);
    const dataItems = data.data;
    if(!dataItems.length) return null;
    
    const bunItem = useMemo(() => {
        const bun = dataItems.find((item)=>item.type==='bun')
        dispatch(setBun(bun))
        return bun
    }, [dataItems]  );
    
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
