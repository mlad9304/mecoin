import React from 'react';
import styles from './PageTemplate.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

const PageTemplate = ({header, children, responsive, padding, footer}) => {
  return (
    <div className={cx('page')}>
      <div className={cx('image')} />
      <header>
        {header}
      </header>
      <main className={cx('content', {
        padding: padding, // sets 3.5 rem padding-top
        responsive
      })}>
        {children}
      </main>
      <footer>
        {footer}
      </footer>
    </div>
  );
};

export default PageTemplate;