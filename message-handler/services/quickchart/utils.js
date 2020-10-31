const DOMAIN = "https://quickchart.io";

const getUrl = (data = {}) =>
    `${DOMAIN}/chart?bkg=white&c=${encodeURIComponent(JSON.stringify(data))}`;

module.exports = { getUrl };
