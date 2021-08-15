const Joi = require('joi');
const { objectId } = require('./custom.validation');

const getNewsFeed = {
  query: Joi.object().keys({
    proxy: Joi.string().required(),
  }),
};

const getRss = {
  query: Joi.object().keys({
    name: Joi.string(),
    source: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const createRss = {
  body: Joi.object().keys({
    link: Joi.string().required(),
    source: Joi.string().required(),
    name: Joi.string().required(),
  }),
};

const updateRss = {
  params: Joi.object().keys({
    id: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      link: Joi.string(),
      source: Joi.string(),
      name: Joi.string(),
    })
    .min(1),
};

const deleteRss = {
  params: Joi.object().keys({
    id: Joi.string().custom(objectId),
  }),
};

module.exports = {
  getNewsFeed,
  getRss,
  createRss,
  updateRss,
  deleteRss,
};
