import React from 'react';
import AppHeader from './components/app-header/app-header.jsx';
import BurgerIngridients from './components/burger-ingredients/burger-ingredients.jsx'
import BurgerConstructor from './components/burger-constructor/burger-constructor.jsx';
import styleApp from './App.module.css'

const App = () => {
  const [state, setState] = React.useState({
    idLoading: false,
    hasError: false,
    data: []
  })
  const uri = 'https://norma.nomoreparties.space/api/ingredients'
  const getIngredientsData = () => {
      setState({...state,hasError: false,isLoading: true})
      fetch(uri)
      .then(res => res.json())
      .then(data => {setState({...state,data: data.data, isLoading: false});})
      .catch(e => {
        setState({...state, hasError: true, isLoading: false})
      })
  }
  React.useEffect(()=>{
      getIngredientsData()
  },[])

  const { data, isLoading, hasError} = state
  return (
    <>
      <AppHeader />
      <main className={styleApp.wrapper}>
        {isLoading && 'Загрузка...'}
        {hasError&& 'Произошла ошибка!'}
        { !isLoading && !hasError && data.length &&
           <>
           <BurgerIngridients dataItems={data} />
           <BurgerConstructor dataItems={data} />
           </> 
        }
      </main>
    </>

  )
}

export default App;
