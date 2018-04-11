import React, { Component } from 'react';

import MenuItem from './MenuItem';
import './DashboardLeftbar.scss';
import profileImg from 'static/images/profile.png';
import logoutImg from 'static/images/logout.png';
import storage from 'helpers/storage';

const createMenuItems = (menu_items, active_menu_id, selectMenu) => {

  return menu_items.map(function(item) {

    return(
      <MenuItem
        key={item.id}
        id={item.id}
        title={item.title}
        menuClick={selectMenu}
        image={item.id === active_menu_id ? item.image_active : item.image}
        url={item.url}
        active={item.id === active_menu_id ? true : false}
        activeLink={true}
      />
    );
  });
}

class DashboardLeftbar extends Component {

  handleLogout = async () => {
    const { history, AuthActions } = this.props;

    await AuthActions.logout();
    storage.remove('__USER__');

    history.push('/home');
  }

  render() {

    const { menu_items, active_menu_id, statisticsInfo, DashboardActions, user } = this.props;
    const { totalSpent, gameWon, totalEarned } = statisticsInfo;
    const { handleLogout } = this;

    return (
      <div className="dashboard_leftbar_container">
        <div className="img_container">
          <img src={profileImg} alt="profileimage"/>
          <p className="name">{user.firstname} {user.lastname}</p>
          <p className="win">Win: {gameWon}</p>
        </div>
        <div className="side_menu_container">
          <div className="side_menu">
            <MenuItem
              image="total_spent.png"
              title="Total Spent"
              title2={totalSpent+" Eth"}
              hasBorder={true}
            />
            <MenuItem
              image="game_won.png"
              title="Game won"
              title2={gameWon}
              hasBorder={true}
            />
            <MenuItem
              image="total_earned.png"
              title="Total Earned"
              title2={totalEarned+" Eth"}
              hasBorder={true}
            />

            {createMenuItems(
              menu_items,
              active_menu_id,
              DashboardActions.selectMenu
            )}
            
            <a 
                onClick={handleLogout} 
                className='d-block w-100 menu_item_container menu_item' 
            >
                <img src={logoutImg} className="icon" alt="img"/>
                <p className='title'>Logout</p>
            </a>
          </div>
          <span className='fa fa-pencil-square-o edit' />
        </div>
      </div>
    );
  }
}

export default DashboardLeftbar;
