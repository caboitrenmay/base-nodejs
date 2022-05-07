const Parser = require('rss-parser');

const parser = new Parser();

/**
 * Get all news feed.
 * @param {string} rssUrl
 * @returns {Promise<Feeds>}
 */
const parseRss = async (rssUrl) => {
  const data = await parser.parseURL(rssUrl);
  return data;
};

module.exports = {
  parseRss,
};
