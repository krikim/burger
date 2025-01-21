import FeedBox from "../../components/feed/feed-box/feed-box";

const ProfileOrders = () =><FeedBox url = {'wss://norma.nomoreparties.space/orders?token='+localStorage.getItem('accessToken')?.replace("Bearer ", "")} isAuth={true} />

export default ProfileOrders;