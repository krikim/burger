import React, { useEffect } from 'react';
import AppHeader from './components/app-header/app-header.jsx';
import styleApp from './App.module.css'
import { configureStore } from './services/store.js';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Home from './pages/home.jsx';
import { Routes,Route,useLocation,useNavigate } from 'react-router-dom';
import IngredientDetails from './components/modal/ingredient-details.jsx';
import Modal from './components/modal/modal.jsx';
import SignIn from './pages/signin.jsx';
import Register from './pages/register.jsx';
import ForgotPass from './pages/forgot-pass.jsx';
import ResetPass from './pages/reset-pass.jsx';
import Profile, { Orders } from './pages/profile/profile.jsx';
import { checkUserAuth } from './services/userSlice.js';
import { OnlyAuth, OnlyUnAuth } from './components/protected-route.jsx';
import SignOut from './pages/profile/signout.jsx';
import NotFound404 from './pages/404.jsx';

const App = () => {
  const location = useLocation();
  const background = location.state && location.state.background;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(checkUserAuth());
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
              <Route path='/' element={<OnlyAuth component={<Home/>}/>}></Route>
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
