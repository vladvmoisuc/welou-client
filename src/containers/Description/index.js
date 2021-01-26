import React, { useState } from 'react';
import { Button, Input, AutoComplete, Select } from 'antd';
import { withRouter } from 'react-router-dom';
import { handleAutocompleteFilter } from '../../utils';
import { useAutocompleteSelect } from '../../utils/hooks';
import LogoIcon from '../../icons/logo.svg';
import counties from '../../constants/counties';
import './style.scss';

const { Option } = Select;

const Description = ({ history, user, setUserData }) => {
  const [searchValue, setSearchValue, handleOnSelect] = useAutocompleteSelect();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');

  const handleOnClick = () => {
    setUserData({
      ...user,
      firstName,
      lastName,
      age: Number(age),
      county: searchValue,
      gender,
    });
    history.push('/walkthrough/books');
  };

  const handleGender = (value) => {
    setGender(value);
  };

  return (
    <div className="page-container description">
      <img className="description__logo" src={LogoIcon} />
      <div className="content-container">
        <p className="paragraph">
          Înainte de a începe e nevoie să răspunzi la câteva întrebări, ca
          celelalte persoane să-și facă o idee cât mai bună despre tine.
        </p>
        <Input
          placeholder="Care e prenumele tău?"
          size="large"
          className="input"
          autoComplete="off"
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        />
        <Input
          placeholder="Care e numele tău?"
          size="large"
          className="input"
          autoComplete="off"
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
        />
        <AutoComplete
          options={counties}
          placeholder="În ce județ locuiești?"
          filterOption={handleAutocompleteFilter}
          onSelect={handleOnSelect}
          size="large"
          value={searchValue}
          className="input"
          onChange={setSearchValue}
        />
        <Input
          size="large"
          placeholder="Câți ani ai?"
          className="  input"
          value={age}
          onChange={({ target: { value } }) => setAge(value)}
        />
        <Select
          placeholder="Sex"
          onChange={handleGender}
          className="select_gender"
        >
          <Option value="m">Masculin</Option>
          <Option value="f">Feminin</Option>
        </Select>
      </div>
      <Button
        className="button_primary"
        block
        disabled={false}
        size="large"
        onClick={handleOnClick}
      >
        Continuă
      </Button>
    </div>
  );
};

export default withRouter(Description);
