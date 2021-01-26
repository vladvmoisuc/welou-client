import React from 'react';
import { Badge } from 'antd';
import { Link } from 'react-router-dom';
import ShuffleOrangeIcon from '../../icons/shuffle-orange.svg';
import BellIcon from '../../icons/bell.svg';
import UserIcon from '../../icons/user-grey.svg';
import './styles.scss';

const MenuBar = ({ hasNotifications }) => {
  return (
    <div className="menu-bar">
      <Link to="match" className="menu-bar__item">
        <img src={ShuffleOrangeIcon} className="menu-bar__icon" />
      </Link>
      <Link to="/notifications" className="menu-bar__item">
        <img src={BellIcon} className="menu-bar__icon" />
        {hasNotifications && <span className="menu-bar__badge">!</span>}
      </Link>
      <Link to="/profile" className="menu-bar__item">
        <img src={UserIcon} className="menu-bar__icon" />
      </Link>
    </div>
  );
};

export default MenuBar;
