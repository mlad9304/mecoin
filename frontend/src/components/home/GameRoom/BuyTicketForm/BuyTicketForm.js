import React, { Component } from 'react';
import './BuyTicketForm.scss';
import cx from 'classnames';

class BuyTicketForm extends Component {
  render() {

    const { close, onBuyTicket, onChange, onLeaveGame, form, status, align, leaveBtn } = this.props;
    const { amount } = form;
    const { game } = status;
    const balance = game.total - game.sold;

    return (
        <div className="h-100 buyTicketFormContainer row">
            <div className={cx('col-lg-8', 'p-0', {'mx-auto': align === 'center'})}>
                <p className="ticketBalance">Ticket Balance: {balance}</p>
                <div className="row buyTicketInputContainer">
                    <div className="col-12 p-0">
                        <input className="buyTicketInput" placeholder="0" onChange={onChange} name="amount" value={amount}/>
                    </div>
                </div>
                <br />
                <a className="btnBuyTicketNow" onClick={onBuyTicket}>Buy Ticket Now</a>
                {leaveBtn && 
                <a className="btnLeave text-right" onClick={onLeaveGame}>LEAVE</a>
                }
                
            </div>
        </div>
      );
  }
}

export default BuyTicketForm;
