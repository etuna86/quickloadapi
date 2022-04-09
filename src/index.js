import React from 'react';
import ReactDOM from 'react-dom';
import './assets/sass/app.scss';
import App from './App';

import reducers from './redux1';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

export const store = createStore(reducers);


if (module.hot) {
  module.hot.accept();
}


ReactDOM.render(
<Provider   store={store} > <App /> </Provider>,document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
