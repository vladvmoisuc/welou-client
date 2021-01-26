import React from 'react';
import { Progress } from 'antd';
import { Link } from 'react-router-dom';
import LogoIcon from '../../icons/logo.svg';
import './styles.scss';

const WalkthroughHeader = ({ path, percent, label = 'Treci peste' }) => {
  return (
    <div className="walkthrough-header">
      <div className="walkthrough-header__top">
        <img className="walkthrough-header__logo" src={LogoIcon} />
        <Link to={`/walkthrough/${path}`} className="link">
          {label}
        </Link>
      </div>
      <Progress percent={percent} />
    </div>
  );
};

export default WalkthroughHeader;
