import { FC } from "react";
import { getIngredients } from "../../services/ingredientSlice";
import { useSelector } from "../../services/store";
import { nanoid } from "@reduxjs/toolkit";
import  styleFO  from './feed-order.module.css'
import { getFeed } from "../../services/ws/ws-slice";
import { useLocation } from "react-router-dom";
import { IFeedItem } from "../../types/ws-types";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { days, EStatus } from "../feed/feed-box/feed-box";
import { useGetFeedOrderQuery, useGetOrderQuery } from "../../services/api";

const FeedOrder: FC = () =>{
    const elements = useSelector(getIngredients);
    const feed = useSelector(getFeed);
    const location = useLocation();
    const from = location.pathname.split('/')[1];
    const orderNumber = location.pathname.split('/')[2];
    
    let order:IFeedItem|undefined = feed.orders?.find((order)=>order.number.toString() === orderNumber)
    if (!order){
        if (from==='orders'){
            const { isLoading, data, isError } = useGetOrderQuery(undefined);
            if (!isLoading &&!isError && data.orders){
               order=data.orders[0] 
               
            }
        }else{
            const { isLoading, data, isError } = useGetFeedOrderQuery(undefined);
            if (!isLoading &&!isError && data.orders){
               order=data.orders[0]
               
            }
        }
        
    }
    if (!order) return <p>Заказ не найден</p>
    
    let summ:number = 0;
    order.ingredients.forEach(ingr=>{
            let price = elements.find(el=>el._id===ingr)?.price;
            return summ+=price? price : 0;
              
        })
    type Tcount  = {
        word: string;
        arr: string[];
    }
    const getCount = ({word,arr}:Tcount )=> {
            var i = arr.length, // var to loop over
                j = 0; // number of hits
            while (i) if (arr[--i] === word) ++j; // count occurance
            return j;
        }
    const wasIngr:string[] = [];
    return (
        <section className={styleFO.section+' ml-10 p-4'}>
                    <span className={styleFO.headnum+" text text_type_digits-default mb-10"}>#{order.number}</span>
                    <span className={styleFO.name+" text text_type_main-medium mb-3"}>{order.name}</span>
                    <span className="text text_type_main-small mb-15">{EStatus[order.status]}</span>
                    <span className="text text_type_main-medium mb-6">Состав:</span>
                    <div id={nanoid()} className={styleFO.scrollbox+' p-0 m-0 ml-4'} >
                        {order.ingredients.map( (item) => {
                                    let el = elements.find(el=>el._id===item)
                                    let was = wasIngr.find(el=>el===item)
                                    if (was) return;
                                    wasIngr.push(item);
                                    return ( 
                                
                                            <div className={styleFO.construct+' mt-0 mb-0 ml-0 mr-6'}>
                                                <img className={styleFO.imgingr} src={el?.image} />
                                                <div className={styleFO.nameconstr + " text text_type_main-default ml-4 mr-4 mt-4 mb-4"}>{el?.name}</div>
                                                <div className={styleFO.summ +' text text_type_digits-default ml-4 mr-4 mt-4 mb-4'}><span className="mr-2 mb-2">{getCount({word:item,arr:order.ingredients})} x {el?.price}</span><CurrencyIcon/></div>
                                    
                                            </div>
                                    )
                            })
                        }
                    </div>
                    <div className={styleFO.summary + " ml-4 mt-10"}><span className="text text_type_main-default">{days(order.updatedAt)}</span><span className={styleFO.headleft+' text text_type_digits-default'}>{summ}<CurrencyIcon /></span></div>     
            
            </section>
    )
}

export default FeedOrder;