import React from 'react';
import { Button, AutoComplete } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import WalkthroughHeader from '../../components/WalkthroughHeader';
import { listOfMusicGenres } from '../../constants/suggestions';
import { handleAutocompleteFilter } from '../../utils';
import { useAutocompleteMethods } from '../../utils/hooks';
import './style.scss';

const MusicPreferences = ({ history, user, setUserData }) => {
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
      music: options,
    });
    history.push('/walkthrough/series');
  };

  return (
    <div className="walkthrough-page page-container">
      <WalkthroughHeader path="series" percent={50} />
      <div className="walkthrough-page__content">
        <h1 className="heading">Ce genuri muzicale îți plac?</h1>
        <p className="paragraph paragraph_medium">
          * Poți introduce mai multe răspunsuri.
        </p>
        <p className="paragraph paragraph_medium">
          * Sugestiile sunt în engleză, dar poți introduce orice denumire.
        </p>
        <AutoComplete
          options={listOfMusicGenres}
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Caută un gen"
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
        <Link to="/walkthrough/sports" className="link">
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

export default withRouter(MusicPreferences);
