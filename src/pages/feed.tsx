import FeedBox from "../components/feed/feed-box/feed-box.tsx";
import FeedSumm from "../components/feed/feed-sum/feed-sum.tsx";

const Feed = () => <><FeedBox url="wss://norma.nomoreparties.space/orders/all" isAuth={false}/><FeedSumm/></>

export default Feed;