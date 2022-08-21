const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { proxyService, rssService } = require('../services');
const logger = require('../config/logger');

const getNewsSource = catchAsync(async (req, res) => {
  const sources = await rssService.querySource();
  res.send(sources);
});

const getEditorRss = catchAsync(async (req, res) => {
  let filter = {};
  if (req.query.source) {
    filter = { source: req.query.source };
  } else {
    filter = { editorChoice: true };
  }
  filter = { ...filter, active: true };
  logger.debug(`filter: ${JSON.stringify(filter)}`);
  const result = await rssService.getRss(filter);
  res.send(result);
});

const getAllRss = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'source']);
  logger.debug(JSON.stringify(filter, null, 2));
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await rssService.queryRss(filter, options);
  res.send(result);
});

const createRss = catchAsync(async (req, res) => {
  const rss = await rssService.createRss(req.body);
  res.status(httpStatus.CREATED).send(rss);
});

const updateRss = catchAsync(async (req, res) => {
  logger.debug(`updateRss id: ${req.params.id} body: ${req.body}`);
  const rss = await rssService.updateRssById(req.params.id, req.body);
  res.send(rss);
});

const deleteRss = catchAsync(async (req, res) => {
  await rssService.deleteRssById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

const getNewsFeed = catchAsync(async (req, res) => {
  const rssUrl = req.body.proxy;
  const result = await proxyService.parseRss(rssUrl);
  res.send(result);

  // const result = await proxyService.parseRss(rssUrl);
  // const array = result ? result.items || [] : [];
  // res.send(array);
});

module.exports = {
  getNewsSource,
  getAllRss,
  createRss,
  updateRss,
  deleteRss,
  getEditorRss,
  getNewsFeed,
};
