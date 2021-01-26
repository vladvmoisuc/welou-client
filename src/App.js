import { useEffect, useState } from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import routes from './routes';
import { database, onMessageListener } from './api/firebase';
import api from './utils/api';
import { notification } from 'antd';

import './App.scss';

const App = ({ history }) => {
  const [user, setUserData] = useState({});
  const [messages, setMessages] = useState([]);
  const [conversationPartnerId, setConversationPartnerId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [conversationPartner, setConversationPartner] = useState([]);
  const [chatData, setChatData] = useState(null);

  useEffect(() => {
    if (user && user.currentChatId) {
      database
        .collection('chats')
        .doc(user.currentChatId)
        .collection('messages')
        .limit(50)
        .onSnapshot((snapshot) => {
          const messagesList = [...messages];
          snapshot.forEach((doc) => messagesList.push(doc.data()));
          setMessages(messagesList);
        });
    }
  }, [user.currentChatId]);

  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('token');
      const facebookId = localStorage.getItem('facebookId');
      if (token) {
        try {
          await api.get(`https://graph.facebook.com/me?access_token=${token}`);

          if (facebookId) {
            history.push('/match');
          }
        } catch (error) {
          window.location.href = '/';
          localStorage.clear();
        }
      }
    };

    validateToken();
    onMessageListener((payload) => {
      if (
        (payload.data.type === 'message' &&
          window.location.pathname === '/chat') ||
        (payload.data.type === 'request' &&
          window.location.pathname === '/notifications')
      ) {
        return;
      } else {
        notification.open({
          message: payload.notification.title,
          description: payload.notification.body,
          duration: 2,
        });
      }
    });
  }, []);

  return (
    <div className="app">
      <div className="app__containers">
        <Switch>
          {routes.map(({ route, component }) => (
            <Route path={route} exact={true} key={route}>
              {component({
                chatData,
                setChatData,
                conversationPartner,
                setConversationPartner,
                conversationPartnerId,
                messages,
                setConversationPartnerId,
                setMessages,
                setUserData,
                user,
                notifications,
                setNotifications,
              })}
            </Route>
          ))}
          <Redirect from="*" to="/match" />
        </Switch>
      </div>
    </div>
  );
};

export default withRouter(App);
