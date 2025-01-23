import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from './services/store.ts'
import {BrowserRouter as Routers} from 'react-router-dom'


const root = document.getElementById('root'); 
if (root){
createRoot(root).render(
    <Provider store={configureStore()}>
        <Routers>
            <App />
        </Routers>
    </Provider>
)
}
