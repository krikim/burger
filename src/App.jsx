import AppHeader from './components/app-header/app-header.jsx';
import BurgerIngridients from './components/burger-ingredients/burger-ingredients.jsx'
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx';
import styleApp from './App.module.css'
function App() {
  
  return (
    <>
      <AppHeader />
      <main className={styleApp.wrapper}>
        <BurgerIngridients />
        <BurgerConstructor />
      </main>
    </>

  )
}

export default App;
