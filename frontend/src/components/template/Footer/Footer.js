import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <div id="footer" className='footer row mr-0 ml-0'>
      <p className="col ml-auto mt-3">
        <span className="fa fa-copyright" />2018 One Tap Crypto Gambling Game.
        All rights reserved
      </p>
      <div className="col mr-auto text-right">
        <div className="social">
          <p>
            <i className="fa fa-facebook" />
          </p>
          <p>
            <i className="fa fa-twitter" />
          </p>
          <p>
            <i className="fa fa-linkedin" />
          </p>
          <p>
            <i className="fa fa-google-plus" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
