import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, MouseEventHandler, useEffect } from 'react';
import styleBC from './feed-box.module.css';
import { TBun } from '../../../services/constrSlice.ts';
import { getFeed } from '../../../services/ws/ws-slice.ts';
import { IFeedItem } from '../../../types/ws-types.ts';
import { wsConnect, wsDisconnect } from '../../../services/ws/ws-actions.ts';
import { getIngredients } from '../../../services/ingredientSlice.ts';
import { useDispatch, useSelector } from '../../../services/store.ts';
import { useLocation, useNavigate } from 'react-router-dom';

export interface IFeedBoxElementIngredients {
    inElements: string[];
}

const SummPrice: FC<IFeedBoxElementIngredients> = ({ inElements }) => {
    const elements = useSelector(getIngredients);
    const summ = inElements.map(ingr => {
        let price = elements.find(el => el._id === ingr)?.price;
        return price ? price : 0;
    })
    //console.log(summ)
    return (
        <span className={styleBC.summ + ' text text_type_digits-default'}>
            <span className='mr-2 p-2'>
                {summ.reduce((acc, num) => acc + num, 0)}
            </span>
            <CurrencyIcon />
        </span>

    );
}

const ArrayIngr: FC<IFeedBoxElementIngredients> = ({ inElements }) => {
    const elements = useSelector(getIngredients);
    //console.log(inElements, elements)
    return (
        <span>
            {
                inElements.map((ingrId,index) => (
                    <span key={'img'+ingrId+index}>
                        <img className={styleBC.imgingr} src={elements.find((el: TBun) => el._id === ingrId)?.image_large} />
                    </span>
                ))
            }
        </span>


    );
};
interface IFeedBoxElement {
    item: IFeedItem;
    index: number;
    id: string;
    isAuth: boolean
}


export function days(dateItem: string): string {

    const now = new Date();
    const newDate = new Date(dateItem);
    const myDiff = now.getDay() - newDate.getDay();
    const min = newDate.getMinutes();
    const hours = newDate.getHours();
    let zero = '';
    if (hours < 10) {
        zero = '0';
    }
    let orderTime = zero + hours.toString();
    zero = '';
    if (min < 10) {
        zero = '0';
    }
    orderTime += ':' + zero + min.toString();

    if (myDiff === 0) {
        return 'сегодня, ' + orderTime;
    } else if (myDiff === 1) {
        return 'вчера, ' + orderTime;
    } else {
        return myDiff + ' дня назад, ' + orderTime;
    }

}
export enum EStatus {
    pending = 'Готовится',
    done = 'Выполнен',
    created = 'Создан',
}
const FeedBoxElement: FC<IFeedBoxElement> = ({ item, isAuth }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleClick:MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        if (isAuth){
            navigate(`/orders/${item.number}`, { state: { background: location } });

        }
        else{
                navigate(`/feed/${item.number}`, { state: { background: location } });
        }
    }

    return (
        <>

            <div key={'elem'+item._id} className={styleBC.construct + ' mb-4'} onClick={handleClick}  >


                <p className='text text_type_digits-default mt-6' ><span>#{item.number}</span><span className={styleBC.headleft + " text text_type_main-small ml-8"}>{days(item.createdAt)}</span></p>
                <p className={styleBC.name + " text text_type_main-medium mt-6"}>{item.name}</p>
                {isAuth && <p className='text text_type_main-small mt-2'>{EStatus[item.status]}</p>}
                <p className=' mt-6 mb-6'>
                    <ArrayIngr inElements={item.ingredients} />
                    <SummPrice inElements={item.ingredients} />
                </p>
            </div>
        </>

    )
}

type TUrl = {
    url: string;
    isAuth: boolean
}
const FeedBox: FC<TUrl> = ({ url, isAuth }) => {
    const dispatch = useDispatch();
    const feed = useSelector(getFeed);

    useEffect(() => {
        const FEED_URL = url;

        dispatch(wsConnect(FEED_URL));

        //console.log('effect')
        return () => {
            dispatch(wsDisconnect());
        }
    }, [dispatch])


    return (
        <>
            {feed && <section className={styleBC.section + ' ml-10 p-4'}>
                {!isAuth && <h2 className='text text_type_main-large mt-10 mb-5'>Лента заказов</h2>}

                <div id={'feedScroll'+isAuth} className={styleBC.scrollbox + ' p-0 m-0 ml-4'} >
                    {feed.orders?.map((item, index) => <FeedBoxElement key={'fbel'+item._id} item={item} index={index} id={item._id} isAuth={isAuth} />)}
                </div>

            </section>
            }
        </>
    )
}
export default FeedBox
