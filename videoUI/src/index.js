import React from 'react';
import ReactDOM from 'react-dom';
import Video from './components/video';
import reportWebVitals from './reportWebVitals';
import RouteApp from './components/router';
import './components/icons/iconLibrary';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <React.StrictMode>
    <RouteApp/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
