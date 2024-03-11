import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter  } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import App from './App.jsx'
import { ToastContainer } from "react-toastify";

import './index.css'
import TextContextProvider from './components/TextContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
<ToastContainer ></ToastContainer>
 <TextContextProvider>
 
    <App />
    
 </TextContextProvider>
 
 </BrowserRouter>
)
