import React from 'react';
import { Link } from 'react-router-dom';
import LeftArrowIcon from '../../icons/left-arrow.svg';
import EditIcon from '../../icons/slider.svg';
import StarIcon from '../../icons/star.svg';
import './styles.scss';

const TopBar = ({
  label,
  hasRightIcon = true,
  hasEditIcon = true,
  goToChat = false,
  goToNotifications = false,
  linkTo = 'profile/edit',
}) => {
  const getRedirectLocation = () => {
    if (goToChat) {
      return '/chat';
    } else if (goToNotifications) {
      return '/notifications';
    } else {
      return '/match';
    }
  };

  return (
    <div className="top-bar">
      <div className="top-bar__left-container">
        <Link to={getRedirectLocation()}>
          <img className="top-bar__icon" src={LeftArrowIcon} />
        </Link>
        <span className="top-bar__name">{label}</span>
      </div>
      {hasRightIcon && (
        <Link to={linkTo}>
          <img
            className="top-bar__icon"
            src={hasEditIcon ? EditIcon : StarIcon}
          />
        </Link>
      )}
    </div>
  );
};

export default TopBar;
