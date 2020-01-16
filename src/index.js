import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Parse from 'parse'

Parse.serverURL = 'https://parseapi.back4app.com'; // This is your Server URL
Parse.initialize(
  'RxNV8NwdLxj6ybkoL0AvcbgxXqfyRthKENFqWmQj', // This is your Application ID
  '7CqXhbdXpQA6nJqp5cp5Ytwe27mrO449qWGqqnBW' // This is your Javascript key
);


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
