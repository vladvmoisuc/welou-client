import React, { useState, useEffect } from 'react';
import { Badge, Button, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import api from '../../utils/api';
import ProfileCard from '../../components/ProfileCard';
import MenuBar from '../../components/MenuBar';
import { loadUserData } from '../../utils/hooks';
import WordMarkIcon from '../../icons/wordmark.svg';
import LogoIcon from '../../icons/icon.svg';
import AddUserIcon from '../../icons/add-user.svg';
import RefreshIcon from '../../icons/refresh.svg';
import ChatIcon from '../../icons/direct.svg';
import './style.scss';

const Match = ({
  user,
  setUserData,
  history,
  messages,
  setMessages,
  conversationPartnerId,
  setConversationPartnerId,
  setNotifications,
  notifications,
}) => {
  const [hasChatActive, setChatStatus] = useState(false);
  useEffect(() => {
    loadUserData(user, setUserData);

    if (user.currentChatId) {
      // getMessages();
      setChatStatus(true);
    } else if (Object.keys(user).length) {
      getMatch();
      setChatStatus(false);
    }
  }, [user._id]);

  useEffect(() => {
    if (conversationPartnerId === null && messages.length) {
      if (messages[0].senderId !== user._id) {
        setConversationPartnerId(messages[0].senderId);
      } else {
        setConversationPartnerId(messages[0].receiverId);
      }
    }
  }, [messages]);

  const [userData, setMatchData] = useState(null);

  const getMatch = async () => {
    try {
      let id = user._id;
      if (!user._id) {
        const { data } = await api.get('/user', {
          params: {
            facebookId: user.facebookId,
          },
        });

        id = data._id;
      }

      const {
        data: [match],
      } = await api.get('/user/random', {
        params: {
          id,
        },
      });
      setMatchData(match);
    } catch (error) {
      setMatchData(null);
    }
  };

  const rejectUser = async () => {
    await api.post('/user/reject', {
      current_user_id: user._id,
      rejected_user_id: userData._id,
    });
    getMatch();
  };

  const sendRequest = async () => {
    await api.post('/user/request', {
      current_user_id: user._id,
      invited_user_id: userData._id,
    });

    await api.post('/notification', {
      token: user.fcmToken,
      title: 'Notificare nouă',
      message: 'Cineva vrea să vorbiți',
      icon: userData.avatar,
    });

    getMatch();
  };

  const getMessages = async () => {
    const { data } = await api.get('/chat/messages', {
      params: {
        chatId: user.currentChatId,
      },
    });
    setMessages(data);
  };

  const getNotifications = async () => {
    const { data } = await api.get('/user/notifications', {
      params: {
        id: user._id,
      },
    });
    setNotifications(data);
  };

  useEffect(() => {
    if (user._id) {
      getNotifications();
    }
  }, [user._id]);

  useEffect(() => {
    loadUserData(user, setUserData);
    if (user._id) {
      getNotifications();
    }
  }, []);

  return (
    <div className="walkthrough-page page-container match">
      <div className="header">
        <img src={WordMarkIcon} className="header__logo_wordmark" />
        <Link to="/chat">
          <Badge
            count={
              messages &&
              messages[messages.length - 1] &&
              messages[messages.length - 1].senderId !== user._id
                ? '!'
                : null
            }
          >
            <img src={LogoIcon} className="header__logo_icon" />
          </Badge>
        </Link>
      </div>
      <div className="walkthrough-page__content match__profile-card">
        {!!userData ? (
          <ProfileCard collapsed user={userData} />
        ) : hasChatActive ? (
          <>
            <p className="paragraph">
              Ai deja o conversație în deșfășurare. Nu poți căuta alte persoane
              în timp ce vorbești cu cineva.
            </p>
            <Button
              block
              disabled={false}
              size="large"
              className="button_primary"
              onClick={() => history.push('/chat')}
              icon={<img className="button__icon" src={ChatIcon} />}
            >
              Mergi la chat
            </Button>
          </>
        ) : (
          <p className="paragraph">
            Nu am putut găsi nici o persoană potrivită pentru tine. Te rugăm să
            revii mai târziu sau încearcă să dai un refresh.
          </p>
        )}
      </div>
      {!!userData ? (
        <div className="match__buttons">
          <Button
            block
            disabled={false}
            size="large"
            className="button_primary button_red"
            onClick={rejectUser}
            icon={<img className="button__icon" src={RefreshIcon} />}
          >
            Refuză
          </Button>
          <Button
            block
            disabled={false}
            size="large"
            className="button_primary "
            onClick={sendRequest}
            icon={<img className="button__icon" src={AddUserIcon} />}
          >
            Discută
          </Button>
        </div>
      ) : null}
      <MenuBar hasNotifications={!!notifications && !!notifications.length} />
    </div>
  );
};

export default withRouter(Match);
