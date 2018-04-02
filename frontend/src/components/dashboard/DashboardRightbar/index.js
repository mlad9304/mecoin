import React, { Component } from 'react';
import { BuyTicketBox } from 'components';
import './DashboardRightbar.scss';

class DashboardRightbar extends Component {
  render() {
    return (
      <div className='dashboard_rightbar_container'>
        <BuyTicketBox />
        <br />
        <BuyTicketBox />
        <br />
        <BuyTicketBox />
      </div>
    );
  }
}

export default DashboardRightbar;
