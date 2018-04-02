import React from 'react';

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