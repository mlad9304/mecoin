import React from 'react';
import { Link } from 'react-router-dom';

import './BuyTicketBox.scss';
import dice from 'static/images/dice.png';
import ticket from 'static/images/ticket.png';
import chart from 'static/images/chart.png';
import clock from 'static/images/clock.png';

const BuyTicketBox = () => {
  return (
    <div className="buytickbox_container">
      <div className="row">
        <div className="col text-center pl-4 pr-4">
          <p className="dice_container">
            <img src={dice} role="presentation" alt="dice"/>
          </p>
          <h4 className="text-white text-center">0/10</h4>
          <p className="rolldice">Roll the dice</p>
          <Link to="/game" className="buyTicket">Buy Ticket</Link>
        </div>
        <div className="col text-center pt-3">
          <p className="text-center color-whitegrey">
            <img className="ticket" src={ticket} alt="ticket"/>
            &nbsp;&nbsp;Tickets sold: &nbsp;&nbsp; 6
          </p>
          <p className="text-center">
            <img className="chart" src={chart} alt="chart"/>
          </p>
          <p className="text-center color-whitegrey mb-0">
            <img className="clock" src={clock} alt="clock"/>
            &nbsp;00:01:23
          </p>
          <p className="'text-right remaining'">
            Remaining to start
          </p>
        </div>
        <div className="divider" />
      </div>
      <span className="'fa .fa-info-circle info'" />
    </div>
  );
};

export default BuyTicketBox;
