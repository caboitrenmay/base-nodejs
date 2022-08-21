const httpStatus = require('http-status');
const logger = require('../config/logger');
const { Rss } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Query distinct source
 * @returns {Promise<QueryResult>}
 */
const querySource = async () => {
  const sources = await Rss.find({ active: true }).distinct('source');
  logger.debug('News all source:');
  logger.debug(sources);
  return sources;
};

/**
 * Create a rss
 * @param {Object} rssBody
 * @returns {Promise<Rss>}
 */
const createRss = async (rssBody) => {
  if (await Rss.isUrlTaken(rssBody.url)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Url already taken');
  }
  return Rss.create(rssBody);
};

/**
 * Query for rss
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryRss = async (filter, options) => {
  const rss = await Rss.paginate(filter, options);
  return rss;
};

const getRss = async (filter) => {
  return Rss.find({ ...filter });
};

/**
 * Get rss by id
 * @param {ObjectId} id
 * @returns {Promise<Rss>}
 */
const getRssById = async (id) => {
  return Rss.findById(id);
};

/**
 * Update rss by id
 * @param {ObjectId} id
 * @param {Object} updateBody
 * @returns {Promise<Rss>}
 */
const updateRssById = async (id, updateBody) => {
  const rss = await getRssById(id);
  if (!rss) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rss not found');
  }
  Object.assign(rss, updateBody);
  await rss.save();
  return rss;
};

/**
 * Delete rss by id
 * @param {ObjectId} id
 * @returns {Promise<Rss>}
 */
const deleteRssById = async (id) => {
  const rss = await getRssById(id);
  if (!rss) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Rss not found');
  }
  await rss.remove();
  return rss;
};

module.exports = {
  querySource,
  queryRss,
  getRss,
  createRss,
  getRssById,
  updateRssById,
  deleteRssById,
};
