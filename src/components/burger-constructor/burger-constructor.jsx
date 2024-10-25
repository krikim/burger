import {Button, ConstructorElement, CurrencyIcon,DragIcon}  from '@ya.praktikum/react-developer-burger-ui-components';
import styleBC from './burger-constructor.module.css'
import PropTypes from 'prop-types';
import OrderDetails from '../modal/order-details.jsx'


const SummaryElement = ({summ}) => (
        const handleOpenModal = () => {
            return (
                <OrderDetails openForm = {true}>

                
            )
        }
        <div className={styleBC.summary+' p-8'}>
            <span className='text text_type_digits-default pr-2'>
                {summ}
            </span>
            <CurrencyIcon className='mr-10'/>
            <Button htmlType="button" type="primary" size="small" extraClass="text text_type_digits-small ml-4 p-4">
                Оформить заказ
            </Button>
        </div>
)


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

const HeadElement = ({bun}) => (
        <div className={styleBC.construct+' ml-6 mb-4 mt-25'}>
        <ConstructorElement
          key={bun._id}
          type="top"
          isLocked={true}
          text={bun.name+' (верх)'}
          price={bun.price}
          thumbnail={bun.image}
          extraClass='pt-4 pb-4 pl-6 pr-8'
      />
      </div>
    )

HeadElement.propTypes ={
    bun : constructPropTypes.isRequired
}

const ScrollBoxElement=({dataList}) =>( 
            
            dataList.map(function(item,index){
             return(
                <div key={'scb_element_key_'+index} className={styleBC.construct+' mb-4'}>
                <>
                <DragIcon type="primary" />
                <ConstructorElement
                    key={item._id}
                    text={item.name}
                    price={item.price}
                    thumbnail={item.image}
                    extraClass='pt-4 pb-4 pl-6 pr-8'
                />
                </>
                </div>
                
                )
            }
        )
               
)

ScrollBoxElement.propTypes = {
    dataList: PropTypes.arrayOf(constructPropTypes).isRequired
}

const BottomElement = ({bun}) => (
                    <ConstructorElement
                        key={bun._id+'abc'}
                        type="bottom"
                        isLocked={true}
                        text={bun.name+' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                        extraClass='pt-4 pb-4 pl-6 pr-8'
                    />
                    
    )        

BottomElement.propTypes ={
    bun : constructPropTypes.isRequired
}

const BurgerConstructor = ({dataItems}) => {
    const dataList = dataItems.filter((item)=>item.type==='main'||item.type==='sauce')
    const bun= dataItems.find((item)=>item.type==='bun')
    let summ = bun.price;
    return (
        <>
            <section className={styleBC.section+' ml-10 p-4'}>
                    <HeadElement bun = {bun}/>
                    <div className={styleBC.scrollbox+' p-0 m-0 ml-4'}>
                        <ScrollBoxElement dataList={dataList}/>
                    </div>     
                    <div className={styleBC.construct+' ml-6 mb-4 mt-4'}>
                        <BottomElement bun={bun}/>
                    </div>
                    <div className={styleBC.summary+' mt-6'}>
                        <SummaryElement summ={17000}/>
                     </div>
            
            </section>
        </>
    )
}

export default BurgerConstructor