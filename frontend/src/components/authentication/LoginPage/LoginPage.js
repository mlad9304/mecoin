import React from 'react';
import { LoginContainer, HeaderContainer } from 'containers';

import { PageTemplate, Footer } from 'components';
import './LoginPage.scss';

const LoginPage = () => {
  return (
  <PageTemplate header={<HeaderContainer/>} footer={<Footer/>}>
  
      <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-md-6 mx-auto">
            <LoginContainer />
          </div>
        </div>
      </div>
      
    </PageTemplate>
  );
};

export default LoginPage;