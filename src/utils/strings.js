export const normalizeDiacritics = (text) => {
  const diacriticsTable = {
    ă: 'a',
    â: 'a',
    î: 'i',
    ș: 's',
    ț: 't',
    Ă: 'A',
    Â: 'A',
    Î: 'I',
    Ș: 'S',
    Ț: 'T',
  };
  const listOfCharacters = [];

  text.split('').forEach((character) => {
    const diacritic = diacriticsTable[character];

    if (diacritic) {
      listOfCharacters.push(diacritic);
    } else {
      listOfCharacters.push(character);
    }
  });

  return listOfCharacters.join('');
};
