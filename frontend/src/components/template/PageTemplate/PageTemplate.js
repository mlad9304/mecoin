import React from 'react';
import styles from './PageTemplate.scss';

const PageTemplate = ({header, children, footer}) => {
  return (
    <div>
      <header>
        {header}
      </header>
      <main>
        {children}
      </main>
      <footer>
        {footer}
      </footer>
    </div>
  );
};

export default PageTemplate;