import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BingoCounterProvider } from './bingo/context-api/bCountProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
<BingoCounterProvider>
    <App />
</BingoCounterProvider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
