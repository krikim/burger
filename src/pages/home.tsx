import BurgerIngredients from '../components/burger-ingredients/burger-ingredients.js';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const Home = () => (
            <>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients/>
                </DndProvider>
           </>)

export default Home;
