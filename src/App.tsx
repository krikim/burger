import  { useEffect } from 'react';
import AppHeader from './components/app-header/app-header.tsx';
import styleApp from './App.module.css'
import Home from './pages/home.tsx';
import { Routes,Route,useLocation,useNavigate } from 'react-router-dom';
import IngredientDetails from './components/modal/ingredient-details.tsx';
import Modal from './components/modal/modal.tsx';
import SignIn from './pages/signin.tsx';
import Register from './pages/register.tsx';
import ForgotPass from './pages/forgot-pass.tsx';
import ResetPass from './pages/reset-pass.tsx';
import Profile, { Orders } from './pages/profile/profile.tsx';
import { checkUserAuth } from './services/userSlice.ts';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route.tsx';
import SignOut from './pages/profile/signout.tsx';
import NotFound404 from './pages/404.tsx';
import Feed from './pages/feed.tsx';
import FeedOrder from './components/modal/feed-order.tsx';
import { useDispatch } from './services/store.ts';
import OrderDetails from './components/modal/order-details.tsx';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUserAuth());
    //localStorage.setItem('forgotPass',false);
   console.log('effect') 
  },[dispatch])

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    console.log('closed')
    
    navigate(-1);
    //setShowItem(false);
    
  };
  
  //const store = ;
  return (
    <>
        <AppHeader />

          <main className={styleApp.wrapper}>
            <Routes location={background||location}  >
              <Route path='/' element={<Home/>}/>
              <Route path='/feed' element={<Feed/>}/>
              <Route path='/feed/:number' element={<FeedOrder/>}/>
              <Route path='/items/:itemId' element={<OnlyAuth component={<IngredientDetails/>}/>} />
              <Route path='/orders/:number' element={<OnlyAuth component={<FeedOrder/>}/>} />
              <Route path='/order' element={<OnlyAuth component={<OrderDetails/>}/>} />
              <Route path='/signin' element={<OnlyUnAuth component={<SignIn/>}/>}/>
              <Route path='/signout' element={<OnlyAuth component={<SignOut/>}/>}/>
              <Route path='/register' element={<OnlyUnAuth component={<Register/>}/>}/>
              <Route path='/forgot-pass' element={<OnlyUnAuth component={<ForgotPass/>}/>}/>
              <Route path='/reset-pass' element={<OnlyUnAuth component={<ResetPass/>}/>}/>
              <Route path='/profile' element={<OnlyAuth component={<Profile/>}/>}/>
              <Route path='/profile/orders' element={<OnlyAuth component={<Orders/>}/>}/>
              <Route path='*' element={<NotFound404/>}/>
            </Routes>
          </main>
     
    {background && (
        <Routes>
            <Route
              path='/items/:itemId'
              element={
                <Modal  
                handleModalClose={handleModalClose}
                show={true}
                header='Детали ингридиента'
                 >
                  <IngredientDetails/>
                </Modal>
              }
            />
            <Route
              path='/feed/:number'
              element={
                <Modal  
                  handleModalClose={handleModalClose}
                  show={true}
                  header=''
                 >
                  <FeedOrder/>
                </Modal>
              }
            />
            <Route
              path='/orders/:number'
              element={
                <OnlyAuth 
                  component={
                
                <Modal  
                  handleModalClose={handleModalClose}
                  show={true}
                  header=''
                 >
                  <FeedOrder/>
                </Modal>}
                />
              }
            />
            <Route
              path='/order'
              element={
                <OnlyAuth 
                  component={
                            <Modal  
                                handleModalClose={handleModalClose}
                                show={true}
                                header=''
                            >
                            <OrderDetails/>
                            </Modal>
                  }
                  />
                
              }
            />
        </Routes>
      )}
    </>
  )
}

export default App;
