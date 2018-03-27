import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import cx from 'classnames';

import './MenuItem.scss';

class MenuItem extends Component {
    
    render() {
        const {image, title, title2, hasBorder, active, url, activeLink, menuClick, id} = this.props;

        let imgSrc;
        imgSrc = require(`static/images/${image}`);
        
        return (
            <Link 
                onClick={() => menuClick(id)} 
                className={cx('d-block w-100', 'menu_item_container', {menu_item_border: hasBorder, 'disabled-link': !activeLink, 'menu_item': activeLink})} 
                to={url}
            >
                <img src={imgSrc} className="icon" />
                <p className={cx('title', {active})}>{title}</p>
                <div className="title2">{title2}</div>
            </Link>
        );
    }
}

MenuItem.defaultProps = {
    image: 'total_spent.png',
    title: 'Total spent',
    title2: '',
    hasBorder: false,
    active: false,
    url: '/',
    activeLink: false,
    menuClick: null,
    id: -1
};

export default MenuItem;
