import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import './App.css';
import List from './components/List';
import Create from './components/Create';
import Edit from './components/Edit';

class App extends Component {
  render() {
    return (
      <Router>
      <div className={"app invoice-app"}>
        <header className={"app-header invoice-app-header"}>
          <h1 className={"app-header-title invoice-app-header-title"}>Invoice App</h1>
        </header>
        <div className={"app-content invoice-app-content"}>
          <Switch>
            <Route exact path={"/"} component={List} />
            <Route path={"/create"} component={Create} />
            <Route path={"/edit/:id"} component={Edit} />
          </Switch>
        </div>
      </div>
      </Router>
    );
  }
}

export default App;
