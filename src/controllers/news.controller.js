const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { proxyService, rssService } = require('../services');
const logger = require('../config/logger');

const getNewsFeed = catchAsync(async (req, res) => {
  const rssUrl = req.query.proxy;
  logger.info('proxy: ', rssUrl);
  const result = await proxyService.parseRss(rssUrl);
  res.send(result);
});

const getAllRss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'source']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rssService.queryRss(filter, options);
  res.send(result);
});

const createRss = catchAsync(async (req, res) => {
  const rss = await rssService.createRss(req.body);
  res.status(httpStatus.CREATED).send(rss);
});

const updateRss = catchAsync(async (req, res) => {
  const rss = await rssService.updateRssById(req.params.id, req.body);
  res.send(rss);
});

const deleteRss = catchAsync(async (req, res) => {
  await rssService.deleteRssById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getNewsFeed,
  getAllRss,
  createRss,
  updateRss,
  deleteRss,
};
