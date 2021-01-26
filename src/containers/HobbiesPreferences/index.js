import React from 'react';
import { Button, AutoComplete } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import WalkthroughHeader from '../../components/WalkthroughHeader';
import { listOfHobbies } from '../../constants/suggestions';
import { handleAutocompleteFilter } from '../../utils';
import { useAutocompleteMethods } from '../../utils/hooks';
import './style.scss';

const HobbiesPreferences = ({ history, user, setUserData }) => {
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
      hobbies: options,
    });
    history.push('/walkthrough/interests');
  };

  return (
    <div className="walkthrough-page page-container">
      <WalkthroughHeader path="interests" percent={70} />
      <div className="walkthrough-page__content">
        <h1 className="heading">Ce hobby-uri ai?</h1>
        <p className="paragraph paragraph_medium">
          * Poți introduce mai multe răspunsuri.
        </p>
        <AutoComplete
          options={listOfHobbies}
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Caută un hobby"
          filterOption={handleAutocompleteFilter}
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
        <Link to="/walkthrough/series" className="link">
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

export default withRouter(HobbiesPreferences);
