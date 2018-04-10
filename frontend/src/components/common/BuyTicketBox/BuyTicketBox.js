import React from 'react';
import { Link } from 'react-router-dom';

import './BuyTicketBox.scss';
import dice from 'static/images/dice.png';
import ticket from 'static/images/ticket.png';
import chart from 'static/images/chart.png';
import clock from 'static/images/clock.png';

import CountDown from 'components/common/CountDown';

const BuyTicketBox = ({ total, sold, onClick, currentTimeLimit }) => {
  return (
    <div className="buytickbox_container">
      <div className="row">
        <div className="col text-center pl-4 pr-4">
          <p className="dice_container">
            <img src={dice} role="presentation" alt="dice"/>
          </p>
          <h4 className="text-white text-center">{sold}/{total}</h4>
          <p className="rolldice">Roll the dice</p>
          <button className="buyTicket" onClick={onClick}>Buy Ticket</button>
        </div>
        <div className="col text-center pt-3">
          <p className="text-center color-whitegrey">
            <img className="ticket" src={ticket} alt="ticket"/>
            &nbsp;&nbsp;Tickets sold: &nbsp;&nbsp; {sold}
          </p>
          <p className="text-center">
            <img className="chart" src={chart} alt="chart"/>
          </p>
          <p className="text-center color-whitegrey mb-0">
            <img className="clock" src={clock} alt="clock"/>
            &nbsp;<CountDown time={currentTimeLimit}/>
          </p>
        </div>
        <div className="divider" />
      </div>
      <span className="'fa .fa-info-circle info'" />
    </div>
  );
};

export default BuyTicketBox;
