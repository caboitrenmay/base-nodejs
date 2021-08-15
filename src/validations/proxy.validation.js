const Joi = require('joi');

const getData = {
  query: Joi.object().keys({
    proxy: Joi.string().required(),
  }),
};

module.exports = {
  getData,
};
