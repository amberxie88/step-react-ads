import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Dashboard from './Dashboard/Dashboard';

<<<<<<< HEAD
ReactDOM.render(
  App(),
  document.getElementById('root')
);
=======
ReactDOM.render(<Dashboard />, document.getElementById('root'));
>>>>>>> 7192b56d4faa1358f406e904fdf08f329169094d

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
