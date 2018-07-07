import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app.jsx';
// import { browserHistory, Router } from 'react-router-dom';
// import routes from './routes';

let features = ml5.featureExtractor('MobileNet');
const classifier = features.classification();


ReactDOM.render(
  <App classifier={classifier}/>
    
  , document.querySelector('.App'));