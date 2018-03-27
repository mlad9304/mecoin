import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import { Hexagon } from 'components';
import './TopLeaderItem.scss';

const TopLeaderItem = ({ szNumber }) => {
  
  return (
    <div className="topleaderItem">
      <Hexagon iSize={1} />
      <p className={cx({first_pos: szNumber === '1st', 
                        second_pos: szNumber === '2nd', 
                        third_pos: szNumber === '3rd',
                        pos: !['1st', '2nd', '3rd'].includes(szNumber)
                    })}>{szNumber}</p>
    </div>
  );
};

TopLeaderItem.defaultProps = {
  szNumber: '1st'
};

TopLeaderItem.propTypes = {
  szNumber: PropTypes.string
};

export default TopLeaderItem;
