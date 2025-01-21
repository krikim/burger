import {  }  from '@ya.praktikum/react-developer-burger-ui-components';
import styleFS from './feed-summ.module.css';
import {  nanoid } from '@reduxjs/toolkit';
import { getFeed } from '../../../services/ws/ws-slice.ts';
import { useSelector } from 'react-redux';
import { FC } from 'react';

type TStatus = {
    status:string
}
const Feed:FC<TStatus> = ({status}) => {
    const feed = useSelector(getFeed);

    return ( 
         feed.orders.slice(0,20).map((item) => (
            item.status === status && <span className='text text_type_digits-default p-1' key={nanoid()}>{item.number}</span>
        ))
    
    )
}

const FeedDone: FC = () => <Feed status='done'/>
const FeedWork: FC = () => <Feed status='created'/>

const FeedSumm = () => {
    const feed = useSelector(getFeed);
    return (
        <>
            {feed&&<section className={styleFS.section+' ml-15 mt-20'}>
                    
                    <span className={styleFS.readybox+' mb-15 text text_type_main-medium'}>
                        <span>
                            <span>Готовы:</span>
                        
                        <span className={ styleFS.readyboxitem+' mr-6'}>
                             
                                <FeedDone/>
                           
                        </span>
                        </span>
                        <span>
                            <span>В работе:</span>
                        
                        <span className={ styleFS.readyboxitem+' mr-6'}>
                             
                                <FeedWork/>
                           
                        </span>
                        </span>
                        
                    </span>
                    <p className=' mt-15 text text_type_main-medium'>Выполнено за все время:</p>
                    <p className=' mb-15 text text_type_digits-large'>{feed.total}</p>
                    <p className=' text text_type_main-medium'>Выполнено за сегодня:</p>
                    <p className=' text text_type_digits-large'>{feed.totalToday}</p>
            </section>
            }
        </>
    )
}
export default FeedSumm
