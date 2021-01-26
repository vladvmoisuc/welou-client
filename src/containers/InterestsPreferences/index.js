import React, { useState } from 'react';
import { Button } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import classNames from 'classnames';
import WalkthroughHeader from '../../components/WalkthroughHeader';
import './style.scss';

const InterestsPreferences = ({ history, user, setUserData }) => {
  const [interest, setInterest] = useState('');

  const handleSelect = (event) => {
    const { value } = event.target;

    setInterest(value);
  };

  const mapInterests = (value) => {
    const interests = {
      Băieți: 'm',
      Fete: 'f',
    };

    return interests[value];
  };

  const handleOnClick = () => {
    setUserData({
      ...user,
      interest: mapInterests(interest),
    });
    history.push('/walkthrough/bio');
  };

  return (
    <div className="walkthrough-page page-container">
      <WalkthroughHeader path="bio" percent={80} />
      <div className="walkthrough-page__content">
        <h1 className="heading">Cu cine ai dori să stai de vorbă?</h1>
        {['Fete', 'Băieți'].map((value) => (
          <button
            className={classNames('pill', 'pill_large', {
              pill_active: interest === value,
            })}
            value={value}
            key={value}
            onClick={handleSelect}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="walkthrough-page__footer">
        <Link to="/walkthrough/hobbies" className="link">
          Înapoi
        </Link>
        <Button
          className="btn_primary"
          disabled={false}
          onClick={handleOnClick}
        >
          Continuă
        </Button>
      </div>
    </div>
  );
};

export default withRouter(InterestsPreferences);
