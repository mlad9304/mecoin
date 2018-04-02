import React, { Component } from 'react';
import { Switch, Route } from 'react-router';

import { SignupPage, LoginPage } from 'components';
import Home from 'components/home';
import Dashboard from 'components/dashboard';

class App extends Component {
  render() {
    
    const { match } = this.props;

    return (
      <div>
        <Switch>
        
          <Route path="/signup" component={SignupPage}/>
          <Route path="/login" component={LoginPage}/>

          <Route path="/dashboard" component={Dashboard}/>
          <Route path="/" component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;