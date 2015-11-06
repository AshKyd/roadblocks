var translations = require('../i18n');

var langs = {};

[
    "en",
    "es",
    "fr",
    "pt",
    "ru",
    "da",
    "af",
    "id",
    "jp",
].forEach(function(lang, i){
    langs[lang] = i;
});

var translationMap = {};
translations.forEach(function(row){
    translationMap[row[0]] = row;
});

var preferredLang = 'en';
navigator.languages.some(function(lang){
    lang = lang.split('-')[0];
    if(langs[lang]){
        preferredLang = lang;
        return true;
    }
});

preferredLang = 'af';

module.exports = function(str){
    if(translationMap[str]){
        return translationMap[str][langs[preferredLang]];
    } else {
        return '_'+str+'_';
    }
};
