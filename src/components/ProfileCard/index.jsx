import React from 'react';
import BookIcon from '../../icons/book.svg';
import SportIcon from '../../icons/sports.svg';
import MusicIcon from '../../icons/music.svg';
import SeriesIcon from '../../icons/series.svg';
import HobbiesIcon from '../../icons/hobbies.svg';
import InterestsList from '../InterestsList';
import './styles.scss';

const ProfileCard = ({ collapsed, user }) => {
  return (
    <>
      <div className="profile-card">
        <img className="profile-card__image" src={user.avatar} />
        <div className="profile-card__data">
          <div className="profile-card__name-and-age">
            <span className="profile-card__name">
              {user.firstName} {user.lastName}
            </span>
            <span className="profile-card__age"> {user.age}</span>
          </div>
          <span className="profile-card__location">
            Din {user.county}, România
          </span>
        </div>
      </div>
      <p className="profile-card__description">{user.description}</p>
      <InterestsList
        interests={user.books}
        icon={BookIcon}
        heading="Citesc cărți din genurile"
        color="orange"
        collapsed={collapsed}
      />
      <InterestsList
        interests={user.series}
        icon={SeriesIcon}
        heading="Am văzut serialele"
        color="light-orange"
        collapsed={collapsed}
      />
      <InterestsList
        interests={user.sports}
        icon={SportIcon}
        heading="Îmi plac sporturile precum"
        color="yellow"
        collapsed={collapsed}
      />
      <InterestsList
        interests={user.music}
        icon={MusicIcon}
        heading="Ascult muzică din genurile"
        color="pink"
        collapsed={collapsed}
      />
      <InterestsList
        interests={user.hobbies}
        icon={HobbiesIcon}
        heading="Am ca hobby-uri"
        color="purple"
        collapsed={collapsed}
      />
    </>
  );
};

export default ProfileCard;
