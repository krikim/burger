import React from 'react';
import AppHeader from './components/app-header/app-header.jsx';
import BurgerIngredients from './components/burger-ingredients/burger-ingredients.jsx';
import styleApp from './App.module.css'
import { configureStore } from './services/store.js';
import { Provider } from 'react-redux';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App = () => {
  const store = configureStore();
  return (
    <>
      <Provider store={store}>
      <AppHeader />
      <main className={styleApp.wrapper}>
           <>
           <DndProvider backend={HTML5Backend}>
            <BurgerIngredients/>
            </DndProvider>
           </> 
      </main>
      </Provider>
    </>

  )
}

export default App;
