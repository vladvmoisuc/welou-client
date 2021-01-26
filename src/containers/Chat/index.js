import React, { useState, useRef, useEffect } from 'react';
import TopBar from '../../components/TopBar';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import api from '../../utils/api';
import { loadUserData } from '../../utils/hooks';
import './style.scss';

const Chat = ({
  conversationPartnerId,
  setMessages,
  user,
  setUserData,
  messages,
  history,
  setConversationPartner,
  conversationPartner,
  chatData,
  setChatData,
}) => {
  const [message, setMessage] = useState('');
  const messagesContainer = useRef(null);

  const handleCurrentMessage = (event) => {
    const { value } = event.target;

    setMessage(value);
  };

  useEffect(() => {
    loadUserData(user, setUserData);
  }, [user._id]);

  useEffect(() => {
    loadUserData(user, setUserData);
  }, []);

  const handleSend = async () => {
    if (message !== '') {
      await api.post('/chat/message', {
        text: message,
        senderId: user._id,
        receiverId: conversationPartnerId,
        documentId: user.currentChatId,
      });

      const { data: partner } = await api.get('/user', {
        params: {
          id: conversationPartnerId,
        },
      });

      setConversationPartner(partner);

      await api.post('/notification', {
        token: partner.fcmToken,
        title: `${partner.firstName} ${partner.lastName} ți-a trimis un mesaj`,
        message: `${message.substring(0, 30)}...`,
        icon: partner.avatar,
      });

      setMessage('');
    }
  };

  useEffect(() => {
    if (
      user &&
      user.currentChatId &&
      !!chatData &&
      chatData.hasLeft === '' &&
      !!messagesContainer &&
      !!messagesContainer.current
    ) {
      messagesContainer.current.scrollTo({
        top: messagesContainer.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);

  useEffect(() => {
    if (user && user.currentChatId) {
      if (!Object.keys(user).length) {
        history.push('/match');
      } else if (
        !!chatData &&
        chatData.hasLeft === '' &&
        !!messagesContainer &&
        !!messagesContainer.current
      ) {
        setTimeout(() => {
          messagesContainer.current.scrollTo({
            top: messagesContainer.current.scrollHeight,
            behavior: 'smooth',
          });
        }, 300);
      }
    }
  }, []);

  useEffect(() => {
    if (user && user.currentChatId) {
      if (conversationPartnerId) {
        getConversationPartner();
      }
    }
  }, [conversationPartnerId]);

  const getConversationPartner = async () => {
    const { data } = await api('/user', {
      params: {
        id: conversationPartnerId,
      },
    });
    setConversationPartner(data);
  };

  useEffect(() => {
    if (user && user.currentChatId) {
      const hasPresentedMatch =
        messages &&
        messages.find(
          ({ text }) =>
            text === 'Avem o potrivire. Amândoi doriți să ieșiți împreună!'
        );

      const getChatData = async () => {
        const { data } = await api.get('/chat/chatroom', {
          params: { chatId: user.currentChatId },
        });
        setChatData(data);
        if (
          data.matches &&
          Object.keys(data.matches).every((key) => data.matches[key]) &&
          !hasPresentedMatch
        ) {
          await api.post('/chat/message', {
            text: 'Avem o potrivire. Amândoi doriți să ieșiți împreună!',
            senderId: user._id,
            receiverId: conversationPartnerId,
            documentId: user.currentChatId,
            type: 'computer',
          });
        }
      };
      getChatData();
    }
  }, []);

  if (
    !!chatData &&
    chatData.hasLeft !== user._id &&
    chatData.hasLeft !== '' &&
    user.currentChatId
  ) {
    return (
      <div className="walkthrough-page chat">
        <TopBar
          label={
            !!conversationPartner &&
            conversationPartner.firstName + ' ' + conversationPartner.lastName
          }
          hasRightIcon={!!user && !!user.currentChatId ? true : false}
          hasEditIcon={false}
          linkTo={'/lets-meet'}
        />
        <p className="paragraph">
          Pentru a găsi o altă persoană cu care să discuți e nevoie să părăsești
          conversația.
        </p>
        <Button
          block
          disabled={false}
          size="large"
          className="button_primary button_red margin-top"
          onClick={() => history.push('/lets-meet')}
        >
          Părăsește conversația
        </Button>
      </div>
    );
  }

  return (
    <div className="walkthrough-page page-container chat">
      <TopBar
        label={
          !!conversationPartner &&
          conversationPartner.firstName !== undefined &&
          conversationPartner.firstName + ' ' + conversationPartner.lastName
        }
        hasRightIcon={!!user && !!user.currentChatId ? true : false}
        hasEditIcon={false}
        linkTo={'/lets-meet'}
      />
      {!!user && !user.currentChatId && (
        <div className="messages walkthrough-page__content">
          <h1 className="heading">Nu ai nici o conversație în desfășurare.</h1>
          <button
            className="button_primary"
            onClick={() => history.push('/match')}
          >
            Caută un partener de discuție
          </button>
        </div>
      )}

      <div
        ref={messagesContainer}
        className="messages walkthrough-page__content"
      >
        {!!messages.length &&
          conversationPartner &&
          user &&
          messages
            .sort((a, b) => a.createdAt - b.createdAt)
            .map((message) => (
              <div
                className={`message ${
                  message.senderId === user._id ? 'message_reverse' : ''
                }`}
                key={message.id}
              >
                {message.type === 'message' && (
                  <img
                    src={
                      message.senderId === user._id
                        ? user.avatar
                        : conversationPartner.avatar
                    }
                    className="message__image image"
                  />
                )}
                {(message.type === 'computer' ||
                  message.type === 'initialization') && (
                  <p className="center">{message.text}</p>
                )}

                {message.type === 'message' && (
                  <span
                    className={`message__text ${
                      message.senderId !== user._id ? 'message__text_blank' : ''
                    }`}
                  >
                    {message.text}
                  </span>
                )}
              </div>
            ))}
      </div>

      {!!user && !!user.currentChatId && (
        <div className="search-box">
          <Input
            size="large"
            onChange={handleCurrentMessage}
            value={message}
            onPressEnter={handleSend}
            addonAfter={
              <Button
                onClick={handleSend}
                size="large"
                type="primary"
                icon={<SendOutlined />}
              />
            }
          />
        </div>
      )}
    </div>
  );
};

export default withRouter(Chat);
