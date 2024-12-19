import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
//@ts-ignore
import { configureStore } from './services/store.js'
import {BrowserRouter as Routers} from 'react-router-dom'
import { Container } from 'react-dom'

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
