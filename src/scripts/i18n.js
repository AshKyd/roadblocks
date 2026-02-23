import translations from "../i18n";

var translationMap, langs, preferredLang;

const i18n = {
    t: function (str) {
        if (translationMap[str]) {
            return translationMap[str][langs[preferredLang]];
        } else {
            return str;
        }
    },
    setup: function (langOverride) {
        langs = {};

        [
            "en",
            // "es",
            // "fr",
            // "pt",
            // "ru",
            // "da",
            // "af",
            // "id",
            // "jp",
        ].forEach(function (lang, i) {
            langs[lang] = i;
        });

        translationMap = {};
        translations.forEach(function (row) {
            translationMap[row[0]] = row;
        });

        preferredLang = "en";
        (langOverride || navigator.languages).some(function (lang) {
            lang = lang.split("-")[0];
            if (langs[lang]) {
                preferredLang = lang;
                return true;
            }
        });
    },
};

i18n.setup();

export default i18n;
