import {Button, ConstructorElement, CurrencyIcon,DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import React, { FC, MouseEvent, useMemo } from 'react';
import styleBC from './burger-constructor.module.css';
//import PropTypes from 'prop-types';
import OrderDetails from '../modal/order-details.js';
import Modal from '../modal/modal.js';
import { useSelector, useDispatch } from 'react-redux';
// @ts-ignore
import { addItem, moveItem, removeItem, setBun } from '../../services/constrSlice.js';
import { useDrag, useDrop } from'react-dnd';
//@ts-ignore
import {  useGetIngredientsQuery } from '../../services/api.js';
import {  nanoid } from '@reduxjs/toolkit';

interface ISummaryElement  {
    summ: number;
}

const SummaryElement:React.FC<ISummaryElement> = ({summ}) => {
    const [show,setShow] = React.useState<boolean>(false)
    
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
                <OrderDetails />
            </Modal>
        </div>)
}


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

interface IHeadElement{
    bun:IconstructPropTypes
}

const HeadElement:React.FC<IHeadElement> = ({ bun }) => {
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
    interface IScrollBoxElement {
        item:IconstructPropTypes,
        index: number,
        id: string
    }
  
const ScrollBoxElement:FC<IScrollBoxElement>=({item,index,id}) =>{ 
            const dispatch = useDispatch();
            
            const handleShowModalItem = (e:MouseEvent<HTMLDivElement>) => {
                const target = e.target as HTMLDivElement;
                
                const rect = target.getBoundingClientRect();

                console.log('rect', rect)   
                if (target.className === 'constructor-element__action pr-2'||target.className === 'constructor-element__price'||(rect.width===18&&rect.height<21)) {
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
              drop: (item:any) => {
                if (index === item.index) return
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
                    {/*
                    // @ts-ignore */}
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

interface IBottomElement{
    bun: IconstructPropTypes
}
 
const BottomElement:FC<IBottomElement> = ({ bun }) => {
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


const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const { isLoading, data, isError } = useGetIngredientsQuery();
    if(isLoading) return null;
    if(isError) return <div>Ошибка загрузки ингредиентов</div>;
    
    
    const [,drop ] = useDrop({
        accept: 'construct',
        drop(item:IconstructPropTypes){
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
    
    const bun:IconstructPropTypes = useSelector((state:any) => state.constr.bun);
    const elements:Array<IconstructPropTypes> = useSelector((state:any) => state.constr.elements);
        
    const summ = useMemo(() => {
        if (!elements.length) return bun.price*2;
        return elements.reduce((acc:number, item:IconstructPropTypes) => acc + item.price, 0) + bun.price*2
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
