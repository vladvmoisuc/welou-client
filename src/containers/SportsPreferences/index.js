import React from 'react';
import { Button, AutoComplete } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import WalkthroughHeader from '../../components/WalkthroughHeader';
import { listOfSports } from '../../constants/suggestions';
import { handleAutocompleteFilter } from '../../utils';
import { useAutocompleteMethods } from '../../utils/hooks';
import './style.scss';

const SportsPreferences = ({ history, user, setUserData }) => {
  const [
    options,
    searchValue,
    setSearchValue,
    handleKeyPress,
    handleOnRemove,
    handleOnSelect,
  ] = useAutocompleteMethods();

  const handleOnClick = () => {
    setUserData({
      ...user,
      sports: options,
    });
    history.push('/walkthrough/music');
  };

  return (
    <div className="walkthrough-page page-container">
      <WalkthroughHeader path="music" percent={40} />
      <div className="walkthrough-page__content">
        <h1 className="heading">Ce sporturi îți plac?</h1>
        <p className="paragraph paragraph_medium">
          * Poți introduce mai multe răspunsuri.
        </p>
        <AutoComplete
          options={listOfSports}
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Caută un sport"
          filterOption={handleAutocompleteFilter}
          size="large"
          className="autocomplete"
          size="large"
          onSelect={handleOnSelect}
          onKeyDown={handleKeyPress}
        />
        {!!options &&
          options.map((value) => (
            <button
              className="pill pill_closable"
              value={value}
              key={value}
              onClick={handleOnRemove}
            >
              {value}
              <CloseOutlined />
            </button>
          ))}
      </div>
      <div className="walkthrough-page__footer">
        <Link to="/walkthrough/books" className="link">
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

export default withRouter(SportsPreferences);
