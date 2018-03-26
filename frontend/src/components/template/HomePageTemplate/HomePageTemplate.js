import React from 'react';
import styles from './HomePageTemplate.scss';

const HomePageTemplate = ({header, footer, leftsidebar, rightsidebar, topleaders, ticketboxes, children}) => {
  return (
    <div>
      <header>
        {header}
      </header>
      <main>
        <div className="container-fluid h-100">
          <div className="row h-100">
            <div className='col-2 bkg-lightdarkblue h-100 pl-0 pr-0 leftBar'>
              {leftsidebar}
            </div>
            <div className="col-8 pt-3 position-relative">
              <div className='position-absolute w-100 topLeadersContainer'>
                {topleaders}
              </div>
              <div className='bkg-lightdarkblue h-100 ticketBoxContainer'>
                {ticketboxes}
              </div>
            </div>
            <div className='col-2 bkg-lightdarkblue pl-0 pr-0 rightBar'>
              {rightsidebar}
            </div>
          </div>
        </div>
      </main>
      <footer>
        {footer}
      </footer>
    </div>
  );
};

export default HomePageTemplate;