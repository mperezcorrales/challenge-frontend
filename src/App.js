import React from 'react';
import './App.css';
import SignIn from "./views/SignIn";
import MainView from "./views/MainView";
import {Route, Switch} from 'react-router-dom';

const App = () => {
  return (
      <main>
        <Switch>
          <Route exact path="/login" component={SignIn}/>
          <Route path="/" component={MainView}/>
        </Switch>
      </main>
  )
};

export default App;
