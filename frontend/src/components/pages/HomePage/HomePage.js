import React, { Component } from 'react';
import { HomePageTemplate, HomeLeftSidebar, Footer } from 'components';
import { HeaderContainer, HomeLeftSidebarContainer, TopLeadersContainer, BuyTicketBoxContainer } from 'containers';

class HomePage extends Component {
  render() {
    return (
      <HomePageTemplate 
        header={<HeaderContainer/>} 
        footer={<Footer/>} 
        leftsidebar={<HomeLeftSidebarContainer/>}
        topleaders={<TopLeadersContainer/>}
        ticketboxes={<BuyTicketBoxContainer/>}
        />
    );
  }
}
export default HomePage;
