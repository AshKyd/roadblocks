var translations = require('../i18n');

var langs = {
    en: 0,
    es: 1,
    fr: 2,
    pt: 3
};

var translationMap = {};
translations.forEach(function(row){
    translationMap[row[0]] = row;
});

navigator.languages.some(function(lang){
    lang = lang.split('-')[0];
    if(langs[lang]){
        preferredLang = lang;
        return true;
    }
});

module.exports = function(str){
    if(translationMap[str]){
        return translationMap[str][langs[preferredLang]];
    } else {
        return '_'+str+'_';
    }
};
