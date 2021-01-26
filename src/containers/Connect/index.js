import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Spin } from 'antd';
import FacebookIcon from '../../icons/facebook.svg';
import LogoIcon from '../../icons/logo.svg';
import { loginWithFacebook, getFacebookLoginData } from '../../api/firebase';
import api from '../../utils/api';
import './style.scss';

const Connect = ({ history, user, setUserData }) => {
  const [isLoading, setLoadingStatus] = useState(false);

  useEffect(() => {
    const getLoginData = async () => {
      try {
        setLoadingStatus(true);
        const facebookLoginResponse = await getFacebookLoginData(() =>
          setLoadingStatus(false)
        );
        if (facebookLoginResponse) {
          localStorage.setItem('token', facebookLoginResponse.accessToken);
        }
        const { data } = await api.get('/user', {
          params: {
            facebookId: facebookLoginResponse
              ? String(facebookLoginResponse.id)
              : '',
          },
        });

        if (data && data.avatar !== facebookLoginResponse.url) {
          await api.post('/user/update', {
            _id: data._id,
            avatar: facebookLoginResponse.url,
          });
        }

        if (facebookLoginResponse) {
          localStorage.setItem('facebookId', facebookLoginResponse.id);
        }
        if (
          !!!data &&
          facebookLoginResponse &&
          facebookLoginResponse.isNewUser
        ) {
          setUserData({
            ...user,
            avatar: facebookLoginResponse.url,
            facebookId: facebookLoginResponse.id,
          });

          history.push('/walkthrough/description');
        } else if (
          data &&
          facebookLoginResponse &&
          !facebookLoginResponse.isNewUdser &&
          data.walkthrough === 'uncompleted'
        ) {
          setUserData({
            ...user,
            avatar: facebookLoginResponse.url,
            facebookId: facebookLoginResponse.id,
          });

          history.push('/walkthrough/description');
        } else if (facebookLoginResponse) {
          setUserData({ ...data, avatar: facebookLoginResponse.url });
          history.push('/match');
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLoginData();
  }, []);

  const handleFacebookLogin = () => {
    loginWithFacebook();
  };

  return !isLoading ? (
    <div className="connect">
      <div className="connect__content">
        <img className="connect__logo" src={LogoIcon} />
        <h1 className="heading">Ești gata să-ți faci prieteni noi?</h1>
        <p className="paragraph bolder">
          Intră în aplicație, descoperă oameni pe placul tău și începe cele mai
          interesante conversații.
        </p>
        <Button
          block
          disabled={false}
          size="large"
          className="button_primary"
          onClick={handleFacebookLogin}
          icon={<img className="button__icon" src={FacebookIcon} />}
        >
          Loghează-te cu Facebook
        </Button>
      </div>
      <div className="connect__placeholder " />
    </div>
  ) : (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

export default withRouter(Connect);
