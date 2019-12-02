const apiUrl = "https://gateway.marvel.com/v1/public";
const publicApiKey = "18ff37fed15296f10e9a60fb7740fee4";
const privateApiKey = "b6d283f97332848ca6969f3e17aa5d1c592c01c4";
const charLimit = 30;
const comicLimit = 10;
let timestamp = new Date().valueOf();
let md5 = require('md5');
let hash = md5(timestamp + privateApiKey + publicApiKey);
let d = new Date();
let endDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDay()}`;




//let characterApiUrl = `${apiUrl}+/characters?+${publicApiKey}&ts='${timestamp}'&hash=${hash}&limit=${charLimit}`;
//let moreCharacterApiUrl = `${apiUrl}+/characters/${id}/comics?${publicApiKey}&ts='${timestamp}'&hash=${hash}&limit=${charLimit}`;
//let detailApiUrl = `${apiUrl}+/characters/${id}/comics?${publicApiKey}&ts='${timestamp}'&hash=${hash}&limit=${charLimit}`;
//let comicApiUrl = `${apiUrl}+`;

export const Constants = {
  getCharacters: () => {
    return String(`${apiUrl}/characters?apikey=${publicApiKey}&ts=${timestamp}&hash=${hash}&limit=${charLimit}`);
  },
  getMoreCharacters: (offset) => {
    return String(`${apiUrl}/characters?apikey=${publicApiKey}&ts=${timestamp}&hash=${hash}&limit=${charLimit}&offset=${offset}`);
  },
  getCharacterDetail: (id) => {
    return String(`${apiUrl}/characters/${id}?apikey=${publicApiKey}&ts=${timestamp}&hash=${hash}&limit=${charLimit}`);
  },
  getComics: (id) => {
    return String(`${apiUrl}/characters/${id}/comics?dateRange=2005-01-01,${endDate}&apikey=${publicApiKey}&ts=${timestamp}&hash=${hash}&limit=${comicLimit}`);
  }
};