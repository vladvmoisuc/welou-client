import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import TopBar from '../../components/TopBar';
import { Modal } from 'antd';
import api from '../../utils/api';
import { loadUserData } from '../../utils/hooks';
import './style.scss';

const Meet = ({
  history,
  user,
  setUserData,
  conversationPartner,
  chatData,
  conversationPartnerId,
  setConversationPartner,
  setMessages,
}) => {
  const [wannaMeet, setMeetDesire] = useState(false);
  const [isModalVisible, setModalVisibility] = useState(false);

  const toggleSwitch = async (status) => {
    await api.post('/chat/chatroom', {
      chatId: user.currentChatId,
      userId: user._id,
      status: !wannaMeet,
    });

    setMeetDesire(!wannaMeet);
  };

  const handleLeave = async () => {
    await api.post('/chat/message', {
      text: `${user.firstName} ${user.lastName} a părăsit conversația.`,
      senderId: user._id,
      receiverId: conversationPartnerId,
      documentId: user.currentChatId,
      type: 'computer',
    });
    await api.post('/chat/chatroom/leave', {
      chatId: user.currentChatId,
      userId: user._id,
    });
    await api.post('/user/update', {
      _id: user._id,
      currentChatId: '',
    });

    setMessages([]);
    setConversationPartner({});
    setUserData({ ...user, currentChatId: '' });
    setModalVisibility(false);
    history.push('/match');
  };

  useEffect(() => {
    loadUserData(user, setUserData);
    const getChatData = async () => {
      const { data } = await api.get('/chat/chatroom', {
        params: { chatId: user.currentChatId },
      });

      setMeetDesire(data.matches[user._id]);
    };

    getChatData();
  }, []);

  return (
    <div className="walkthrough-page page-container meet">
      <TopBar label="Chat" hasRightIcon={false} goToChat={true} />
      <div className="walkthrough-page__content meet-content">
        {!!chatData && !chatData.hasLeft && (
          <>
            <p className="paragraph">
              Ai vrea să ieșiți cândva împreună, dar nu știi cum să îi spui?
              Ți-ar plăcea să știi dacă dorința e reciprocă?
            </p>
            <p>
              * Dacă apeși butonul de mai jos îți vom salva dorința, însă
              cealaltă persoană din această conversație nu va ști.
            </p>
            <p>
              * Dacă și cel/cea cu care vorbești apasă pe buton veți primi
              amândoi o notificare.
            </p>
            <button
              className={`switch ${wannaMeet ? 'switch_on' : ''}`}
              onClick={toggleSwitch}
            >
              <span className="circle" />
            </button>
          </>
        )}
        <div className="meet_leave-conversation">
          <p className="paragraph">Vrei să părăsești conversația?</p>
          <p>
            * Dacă apeși butonul de mai jos conversația va fi ștearsă și nu te
            vei putea reîntoarce la ea.{' '}
            {!!conversationPartner && !!chatData && !chatData.hasLeft
              ? `${conversationPartner.firstName} ${
                  conversationPartner.lastName
                } va fi ${
                  conversationPartner.gender === 'm' ? 'informat' : 'informată'
                }
               că ai părăsit conversația și nu îți va mai putea trimite mesaje.`
              : ''}
          </p>
          <Button
            block
            disabled={false}
            size="large"
            className="button_primary button_red"
            onClick={() => setModalVisibility(true)}
          >
            Părăsește conversația
          </Button>
        </div>
      </div>
      <Modal
        visible={isModalVisible}
        onOk={() => handleLeave()}
        okText="Da"
        cancelText="Nu"
        onCancel={() => setModalVisibility(false)}
      >
        <p className="paragraph">
          Ești {user.gender === 'm' ? 'sigur' : 'sigură'} că vrei să părăsești
          conversația?
        </p>
      </Modal>
    </div>
  );
};

export default withRouter(Meet);
