import React, { Component } from 'react';
import './BuyTicketForm.scss';

class BuyTicketForm extends Component {
  render() {

    const { close, onBuyTicket, onChange, form, status } = this.props;
    const { amount } = form;
    const { game } = status;
    const balance = game.total - game.sold;

    return (
        <div className="h-100 buyTicketFormContainer">
            <p className="ticketBalance">Ticket Balance: {balance}</p>
            <div className="row buyTicketInputContainer">
                <div className="col-10 pr-0">
                    <input className="buyTicketInput" placeholder="0" onChange={onChange} name="amount" value={amount}/>
                </div>
                <div className="col-2 text-left pl-2 position-relative">
                    <div className="unit"></div>
                </div>
            </div>
            <br />
            <button className="btnBuyTicketNow" onClick={onBuyTicket}>
                <b>Buy Ticket Now</b>
            </button>
        </div>
      );
  }
}

export default BuyTicketForm;
