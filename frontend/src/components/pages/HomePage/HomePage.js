import React, { Component } from 'react';
import { HomePageTemplate, HomeLeftSidebar, Footer } from 'components';
import { HeaderContainer } from 'containers';

class HomePage extends Component {
  render() {
    return (
      <HomePageTemplate header={<HeaderContainer/>} footer={<Footer/>} leftsidebar={<HomeLeftSidebar/>}/>
    );
  }
}
export default HomePage;
