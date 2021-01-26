import React from 'react';
import { Button, AutoComplete } from 'antd';
import { Link, withRouter } from 'react-router-dom';
import { CloseOutlined } from '@ant-design/icons';
import WalkthroughHeader from '../../components/WalkthroughHeader';
import { listOfTVSeries } from '../../constants/suggestions';
import { handleAutocompleteFilter } from '../../utils';
import { useAutocompleteMethods } from '../../utils/hooks';
import './style.scss';

const SeriesPreferences = ({ history, user, setUserData }) => {
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
      series: options,
    });
    history.push('/walkthrough/hobbies');
  };

  return (
    <div className="walkthrough-page page-container">
      <WalkthroughHeader path="hobbies" percent={60} />
      <div className="walkthrough-page__content">
        <h1 className="heading">Ce seriale ai urmărit?</h1>
        <p className="paragraph paragraph_medium">
          * Poți introduce mai multe răspunsuri.
        </p>
        <AutoComplete
          options={listOfTVSeries}
          value={searchValue}
          onChange={setSearchValue}
          placeholder="Caută un serial"
          size="large"
          className="autocomplete"
          size="large"
          onSelect={handleOnSelect}
          onKeyDown={handleKeyPress}
          filterOption={handleAutocompleteFilter}
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
        <Link to="/walkthrough/music" className="link">
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

export default withRouter(SeriesPreferences);
