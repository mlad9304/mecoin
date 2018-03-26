import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './Hexagon.scss';

const Hexagon = function HexagonComponent({ iSize }) {
  
  return (
    <div className={cx({hexagon: iSize === 0, hexagonBig: iSize > 0})}>
      <div className={cx({hexTop: iSize === 0, hexTopBig: iSize > 0})} />
      <div className={cx({hexBottom: iSize === 0, hexBottomBig: iSize > 0})} />
    </div>
  );
};

/*
  size: 0 normal 1: big
 */
Hexagon.defaultProps = {
  iSize: 0
};

Hexagon.propTypes = {
  iSize: PropTypes.number
};

export default Hexagon;
