const defaultLang = "en";

module.exports = (text = {}, lang = defaultLang) => {
    const res = {};
    Object.keys(text).map((key) => {
        res[key] = text[key][lang] || text[key][defaultLang];
    });
    return res;
};
