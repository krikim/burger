import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { configureStore } from './services/store.js'
import {BrowserRouter as Routers} from 'react-router-dom'

createRoot(document.getElementById('root')).render(
    <Provider store={configureStore()}>
        <Routers>
            <App />
        </Routers>
    </Provider>
)
