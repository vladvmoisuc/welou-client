import React from 'react';
import classNames from 'classnames';
import './styles.scss';

const InterestsList = ({ heading, icon, interests, color, collapsed }) => {
  return (
    <div className="interest">
      {!collapsed && (
        <div className="interest__header">
          <img src={icon} className="interest__icon" />
          <span className="interest__heading">{heading}:</span>
        </div>
      )}
      <div className="interest__options">
        {collapsed && (
          <img src={icon} className="interest__icon interest__icon_small" />
        )}
        {!!interests.length &&
          interests.map((value) => (
            <button
              className={classNames('pill', {
                [`pill_${color}`]: color,
                pill_small: collapsed,
              })}
              key={value}
              disabled
            >
              {value}
            </button>
          ))}
      </div>
    </div>
  );
};

export default InterestsList;
