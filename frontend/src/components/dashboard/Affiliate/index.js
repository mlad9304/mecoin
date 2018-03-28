import React, { Component } from 'react';
import './Affiliate.scss';

class Affiliate extends Component {
  render() {
    return (
      <div className="affiliate_container">
        <p className='mb-1 affiliate_title'>
          <b>My Affiliate Link</b>
        </p>
        <hr className='mt-0 mb-0 divider' />
        <div className="row h-100">
          <div className="col-9">
            <br />
            <br />
            <div className="row">
              <div className="url">
                <input className="urlInput" />
              </div>
              <a className="copy">
                <b>Copy</b>
              </a>
            </div>
          </div>
          <div className='col-3 h-100 rightBox'>
            <p className="subTitle">My Affiliates:</p>
            <p className="value">556</p>
            <hr className="divider" />
            <p className="subTitle">Affiliates Earning:</p>
            <p className="value">25.03 Eth</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Affiliate;
