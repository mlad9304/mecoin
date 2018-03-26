import React from 'react';
import { LoginContainer, HeaderContainer } from 'containers';

import { PageTemplate, Footer } from 'components';
import styles from './LoginPage.scss';
import classNames from 'classnames/bind';

const LoginPage = () => {
  return (
  <PageTemplate header={<HeaderContainer/>} footer={<Footer/>}>
      <div>
        <LoginContainer />
      </div>
    </PageTemplate>
  );
};

export default LoginPage;