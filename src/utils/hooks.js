import { useState } from 'react';
import api from '../utils/api';

export const useAutocompleteSelect = () => {
  const [value, setValue] = useState('');

  const handleSelect = (option, { label: value }) => {
    setValue(value);
  };

  return [value, setValue, handleSelect];
};

export const useAutocompleteMethods = () => {
  const [options, setOptions] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  const handleOnSelect = (option, { label: value }) => {
    if (options.indexOf(value) < 0) {
      setOptions(options.concat(value));
      setSearchValue('');
    }
  };

  const handleKeyPress = ({ target: { value }, key }) => {
    if (value !== '' && key === 'Enter') {
      handleOnSelect('', { label: value });
    }
  };

  const handleOnRemove = (event) => {
    const { value } = event.currentTarget;

    options.findIndex((sport) => sport === value);

    setOptions(options.filter((sport) => sport !== value));
  };

  return [
    options,
    searchValue,
    setSearchValue,
    handleKeyPress,
    handleOnRemove,
    handleOnSelect,
  ];
};

export const loadUserData = async (user, setUserData) => {
  if (!Object.keys(user).length && localStorage.getItem('facebookId')) {
    const id = localStorage.getItem('facebookId');

    const { data } = await api.get('/user', {
      params: {
        facebookId: id,
      },
    });
    return setUserData({ ...data });
  } else {
    if (!Object.keys(user).length) {
      window.location.href = '/';
      localStorage.clear();
    }
  }
};
