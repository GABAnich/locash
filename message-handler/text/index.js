const text = require("./text");
const getText = require("./get-text");

const languages = ["uk", "en"];

module.exports = (language) => {
    if (!languages.includes(language)) {
        return getText(text);
    }
    return getText(text, language);
};
