import React from 'react';
import { TableItem } from 'components';
import './HomeLeftSidebar.scss';

class HomeLeftSidebar extends React.Component {
  render() {
    return (
      <div className="h-100">
        <div className="sidebarSelectContainer">
          <p className="color-yellow mb-0">History</p>
          <div className="select">
            <select>
              <option disabled>
                Select a game typo
              </option>
              <option>Select History 1</option>
              <option>Select History 2</option>
              <option>Select History 3</option>
            </select>
            <div className="select_arrow" />
          </div>
        </div>
        <div className="scrollBox">
          <div className="scroll_table_container">
            <table className="scroll_table">
              <thead>
                <tr>
                  <th>Players/Team</th>
                  <th>Amount</th>
                  <th>%</th>
                  <th>data1</th>
                  <th>data2</th>
                  <th>data3</th>
                </tr>
              </thead>
              <tbody>
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
                <TableItem />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default HomeLeftSidebar;
