import React, { Component } from 'react';
import { HomePage, SignupPage, LoginPage, ForgotPage, PricingPage, LivePage, CompanyPage, SettingPage, GameRoomPage } from 'components';
import Dashboard from 'components/dashboard';
import { Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={HomePage}/>
        <Route path="/signup" component={SignupPage}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/forgot" component={ForgotPage}/>
        <Route path="/pricing" component={PricingPage}/>
        <Route path="/live" component={LivePage}/>
        <Route path="/company" component={CompanyPage}/>
        <Route path="/setting" component={SettingPage}/>
        <Route path="/game/:type/id/:id" component={GameRoomPage}/>

        <Route path="/dashboard" component={Dashboard}/>
      </div>
    );
  }
}

export default App;