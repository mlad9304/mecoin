import React from 'react';
import './LandingPage.scss';

import { PageTemplate, Footer} from 'components';
import { HeaderContainer } from 'containers';

const LandingPage = () => {

  return (
    <PageTemplate header={<HeaderContainer/>} footer={<Footer />}>
      
    </PageTemplate>
  );
};

export default LandingPage;