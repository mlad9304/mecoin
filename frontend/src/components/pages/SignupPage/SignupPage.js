import React from 'react';
import styles from './SignupPage.scss';
import classNames from 'classnames/bind';

import { PageTemplate, Footer } from 'components';
import { HeaderContainer, RegisterContainer } from 'containers';

const cx = classNames.bind(styles);

const SignupPage = () => {
  return (
  <PageTemplate header={<HeaderContainer/>} footer={<Footer/>}>
      <div className={cx('signup-page')}>
        <RegisterContainer />
      </div>
    </PageTemplate>
  );
};

export default SignupPage;