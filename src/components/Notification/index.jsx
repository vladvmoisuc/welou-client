import React from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

import './styles.scss';

const InterestsList = ({ image, name, id, acceptRequest, declineRequest }) => {
  return (
    <div className="notification">
      <Link to={`/profile?id=${id}`} className="notification__link">
        <img src={image} className="image" />
        <p className="paragraph">{name} vrea să discutați.</p>
      </Link>
      <div className="notification__buttons">
        <button className="button_primary" onClick={acceptRequest}>
          Acceptă
        </button>
        <button className="button_primary button_red" onClick={declineRequest}>
          Refuză
        </button>
      </div>
    </div>
  );
};

export default InterestsList;
