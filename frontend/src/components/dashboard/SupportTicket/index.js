import React from 'react';
import './SupportTicket.scss';

class SupportTicket extends React.Component {
  render() {
    return (
      <div className="support_ticket_container">
        <p className="support_ticket_title">
          <b>Support Ticket</b>
        </p>
        <hr className='mb-0 divider' />
        <div className="row h-100">
          <div className='col h-100 pt-3 verticalDivider'>
            <div className="inputFormContainer">
              <input placeholder="Your Name:" />
            </div>
            <div className="inputFormContainer">
              <input placeholder="Your Email:" />
            </div>
            <div className="inputFormContainer">
              <input placeholder="Subject" />
            </div>
            <div className="textAreaFormContainer">
              <textarea rows="6" placeholder="Your Message" />
            </div>
            <br />
            <a className="btnYellow">Create Support Ticket</a>
          </div>
          <div className="col pt-1 h-100">
            <br />
            <p className="mb-1">
              <b>Recent Ticket Status</b>
            </p>
            <hr className='mt-0 subDivider' />
            <div className="row">
              <div className="col">
                <p className="mb-1">Ticket</p>
              </div>
              <div className="col">
                <p className="mb-1">Status</p>
              </div>
            </div>
            <hr className='mt-0 subDivider' />
            <div className="row">
              <div className="col">
                <p className="mb-1">I didn't get the payment</p>
              </div>

              <div className="col">
                <p className="mb-1">
                  <span className="colorOrange">
                    Pending &nbsp;&nbsp;
                  </span>
                  <i className="fa fa-chevron-right" />{' '}
                </p>
              </div>
            </div>
            <hr className='mt-0 subDivider' />
          </div>
        </div>
      </div>
    );
  }
}

export default SupportTicket;
