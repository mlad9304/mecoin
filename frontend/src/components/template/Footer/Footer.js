import React from 'react';
import './Footer.scss';
import ethereumAcceptedHereImg from 'static/images/ethereum_accepted_here.png';
import perfectOddsImg from 'static/images/perfect_odds.png';

const Footer = () => {
  return (
    <div id="footer" className="footer">
      <div className="footer-brand-wrapper">
        <div className="container">
          <div className="row brand_list">
            <div className="col-md-3 col-sm-3 col-xs-6 brand_anim">
              <img src={ethereumAcceptedHereImg} className="img-responsive" alt="bitcoin accepted here"  />
            </div>
            <div className="col-md-3 col-sm-3 col-xs-6 brand_anim">
              <img src="https://cryptobetfair.com/assets/img/brands/provably-fair.png" className="img-responsive" alt="provably fair" />
            </div>
            <div className="col-md-3 col-sm-3 col-xs-6 brand_anim">
              <img src={perfectOddsImg} className="img-responsive" alt="18" />
            </div>
            <div className="col-md-3 col-sm-3 col-xs-6 brand_anim">
              <img src="https://cryptobetfair.com/assets/img/brands/ssl-secure.png" className="img-responsive" alt="ssl secure" />
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <div className="container text-center">
          <span className="yellow">How to Play</span>
          <a>Terms of Service</a>
          <a>Responsible Gambling</a>
          <a>Provably Fair</a>
          <a>Support</a>
          <span className="yellow">Affiliate Program</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
