import React from 'react';
import styles from './LandingPage.scss';
import classNames from 'classnames/bind';

import { PageTemplate, GameSelector, Footer} from 'components';
import { HeaderContainer, ChatBox } from 'containers';

const cx = classNames.bind(styles);

const LandingPage = () => {

  return (
    <PageTemplate header={<HeaderContainer/>} responsive footer={<Footer />}>
      <div className={cx('landing-page')}>
        <GameSelector />
        <ChatBox />
      </div>
    </PageTemplate>
  );
};

export default LandingPage;