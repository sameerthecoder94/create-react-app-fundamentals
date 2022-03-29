import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { CountContext } from './context/context';

ReactDOM.render(
  <CountContext.Provider value={{ count: 100, newCount: 200 }}>
    <App />
  </CountContext.Provider>,
  document.getElementById('root')
);
