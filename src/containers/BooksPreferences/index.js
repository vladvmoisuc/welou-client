import React, { useState } from 'react';
import { Button, Typography } from 'antd';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import WalkthroughHeader from '../../components/WalkthroughHeader';
import { listOfBooksGenres } from '../../constants/suggestions';
import './style.scss';

const { Title } = Typography;

const BooksPreferences = ({ history, user, setUserData }) => {
  const [genres, setGenres] = useState([...listOfBooksGenres]);

  const onSelect = (event) => {
    const { value } = event.target;
    const genresCopy = [...genres];
    const selectedElementIndex = genres.findIndex(
      (element) => value === element.value
    );
    const selectedItem = genresCopy[selectedElementIndex];

    if (selectedItem.isEnabled) {
      selectedItem.isEnabled = false;
    } else {
      selectedItem.isEnabled = true;
    }

    setGenres(genresCopy);
  };
  const handleOnClick = () => {
    setUserData({
      ...user,
      books: genres
        .filter((genre) => genre.isEnabled)
        .map(({ value }) => value),
    });
    history.push('/walkthrough/sports');
  };

  return (
    <div className="walkthrough-page page-container">
      <WalkthroughHeader path="sports" percent={30} />
      <div className="walkthrough-page__content">
        <Title>Ce genuri de cărți îți plac?</Title>
        <p className="paragraph">* Poți selecta mai multe categorii.</p>
        {genres.map(({ value, isEnabled }) => (
          <button
            className={classNames('pill', { pill_active: isEnabled })}
            value={value}
            onClick={onSelect}
            key={value}
          >
            {value}
          </button>
        ))}
      </div>
      <div className="walkthrough-page__footer">
        <Link to="/walkthrough/description" className="link">
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

export default withRouter(BooksPreferences);
