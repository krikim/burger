import  { useEffect } from 'react';
import AppHeader from './components/app-header/app-header.tsx';
import styleApp from './App.module.css'
import {  useDispatch } from 'react-redux';
import Home from './pages/home.js';
import { Routes,Route,useLocation,useNavigate } from 'react-router-dom';
import IngredientDetails from './components/modal/ingredient-details.js';
import Modal from './components/modal/modal.js';
import SignIn from './pages/signin.js';
import Register from './pages/register.js';
import ForgotPass from './pages/forgot-pass.js';
import ResetPass from './pages/reset-pass.js';
import Profile, { Orders } from './pages/profile/profile.js';
// @ts-ignore
import { checkUserAuth } from './services/userSlice.js';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route.js';
import SignOut from './pages/profile/signout.js';
import NotFound404 from './pages/404.js';

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
              <Route path='/' element={<Home/>}></Route>
              <Route path='/items/:itemId' element={<OnlyAuth component={<IngredientDetails/>}/>} />
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
        </Routes>
      )}
    </>
  )
}

export default App;
