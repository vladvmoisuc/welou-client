import React, { useState } from 'react';
import { Button, Input, Checkbox } from 'antd';
import { withRouter } from 'react-router-dom';
import api from '../../utils/api';
import WalkthroughHeader from '../../components/WalkthroughHeader';
import { getMessagingToken } from '../../api/firebase';
import './style.scss';

const { TextArea } = Input;

const BioPreferences = ({ history, user, setUserData }) => {
  const [description, setDescription] = useState('');
  const [hasNotificationsConsent, setNotificationConsent] = useState(false);
  const [hasDataConsent, setDataConsent] = useState(false);
  const [hasError, setError] = useState('');

  const handleChange = (event) => {
    setDescription(event.target.value);
  };

  const handleOnClick = async () => {
    try {
      setUserData({
        ...user,
        description,
        walkthrough: 'completed',
      });
      await api.post('/user', {
        ...user,
        description,
        walkthrough: 'completed',
      });
      history.push('/match');
    } catch (error) {}
  };

  const handleNotificationConsent = async () => {
    if (!hasNotificationsConsent) {
      const token = await getMessagingToken();

      if (!token) {
        setNotificationConsent(false);
        setError(true);
      } else {
        setNotificationConsent(true);
        setUserData({ ...user, fcmToken: token });
        setError(false);
      }
    } else {
      setNotificationConsent(false);
      setUserData({ ...user, fcmToken: '' });
    }
  };

  const handleDataConsent = () => {
    setDataConsent(!hasDataConsent);
  };

  return (
    <div className="walkthrough-page page-container bio">
      <WalkthroughHeader path="interests" percent={95} label="Înapoi" />
      <div className="walkthrough-page__content bio">
        <h1 className="heading">Ultimele detalii</h1>
        <div className="description-box">
          <img className="image image_small-centered" src={user.avatar} />
          <p className="paragraph_medium">
            Vom folosi ca fotografie de profil poza pe care o ai acum pe
            Facebook.
          </p>
        </div>
        <p className="paragraph bio_paragraph">
          Cum te-ai descrie, în câteva cuvinte?
        </p>
        <TextArea
          className="textarea"
          rows={4}
          showCount
          maxLength={100}
          placeholder="Scrie ceva despre tine"
          value={description}
          onChange={handleChange}
        />
        <Checkbox
          checked={hasNotificationsConsent}
          onChange={handleNotificationConsent}
        >
          Vreau să primesc notificări atunci când primesc cerere sau mesaj de la
          cineva.
        </Checkbox>
        <Checkbox checked={hasDataConsent} onChange={handleDataConsent}>
          Sunt de acord ca datele personale să-mi fie prelucrate conform{' '}
          <a href="#" target="_blank">
            politicii de confidențialitate.
          </a>
        </Checkbox>
        {hasError && (
          <>
            <p className="paragraph error">
              Ai blocat opțiunea pentru afișarea notificărilor. Te rugăm să
              permiți notificările și să bifezi această căsuță.
            </p>
            <p className="paragraph error">
              Important! Nu da refresh după ce ai permis afișarea notificărilor.
            </p>
          </>
        )}
      </div>
      <div className="walkthrough-page__footer">
        <Button
          className="button_primary "
          block
          disabled={!hasDataConsent}
          onClick={handleOnClick}
        >
          Finalizează
        </Button>
      </div>
    </div>
  );
};

export default withRouter(BioPreferences);
