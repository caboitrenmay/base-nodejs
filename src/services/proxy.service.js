const Parser = require('rss-parser');

const parser = new Parser();

/**
 * Login with username and password
 * @param {string} rssUrl
 * @returns {Promise<News>}
 */
const parseRss = async (rssUrl) => {
  const data = await parser.parseURL(rssUrl);
  return data;
};

module.exports = {
  parseRss,
};
