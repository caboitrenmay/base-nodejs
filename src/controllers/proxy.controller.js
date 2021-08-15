const catchAsync = require('../utils/catchAsync');
const { proxyService } = require('../services');
const logger = require('../config/logger');

const getData = catchAsync(async (req, res) => {
  const rssUrl = req.query.proxy;
  logger.info('proxy: ', rssUrl);
  const result = await proxyService.parseRss(rssUrl);
  res.send(result);
});

module.exports = {
  getData,
};
