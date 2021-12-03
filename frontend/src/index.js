import React from 'react';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

import { render } from "react-dom";
import {
    BrowserRouter,
    Routes,
    Route
  } from "react-router-dom";

// Routes
import Login from './components/form/Login';
import Register from './components/form/Register';
import Feed from './components/feed/Feed';
import NotFound from './components/NotFound';

const rootElement = document.getElementById("root");

render(

    <BrowserRouter>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="login" element={<Login />} /> 
            <Route path="register" element={<Register />} />
            <Route path="feed" element={<Feed />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    </BrowserRouter>,
  
rootElement
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
