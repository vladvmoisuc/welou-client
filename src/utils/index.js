import { normalizeDiacritics } from './strings';

export const handleAutocompleteFilter = (searchedText, { value }) => {
  const normalizedSearchText = normalizeDiacritics(searchedText).toLowerCase();
  const regex = new RegExp(normalizedSearchText);

  return regex.test(value.toLowerCase());
};
