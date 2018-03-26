import React from 'react';
import { Hexagon } from 'components';
import './TableItem.scss';


const TableItem = function TableItemComponent() {
  return (
    <tr className="tableRow">
      <td>
        <div className="playerTeam">
          <div className="plImgContainer">
            <Hexagon />
          </div>
          <div className="plInfo">
            <p className="text-white mb-0">Schmidt</p>
            <p className="color-grey mb-0">0/10</p>
          </div>
        </div>
      </td>
      <td>
        <p className="color-lighgrey d-inline-block">$620.32eth</p>
      </td>
      <td>
        <p className="color-lighgrey d-inline-block">70%</p>
      </td>
      <td>Data4</td>
      <td>Data5</td>
      <td>Data6</td>
    </tr>
  );
};

export default TableItem;
