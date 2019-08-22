import React from 'react';
import './App.css';

import { Route, Switch, Redirect } from "react-router-dom";

import HeaderComponent from './Component/Header/Header';
import LoginComponent from './Containers/Auth/Login';
import RegisterComponent from './Containers/Auth/Register';
import MainComponent from './Component/Main/Main';

function App() {
  return (
    <div>
        <Switch>
          <Route exact path="/login" component={LoginComponent} />
          <Route exact path="/register" component={RegisterComponent} />
          <Route path="/" component={MainComponent} />
        </Switch>
    </div>
  );
}

export default App;
