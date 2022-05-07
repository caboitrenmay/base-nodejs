const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const rssSchema = mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
      index: true,
    },
    source: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
      default: true,
    },
    editorChoice: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
rssSchema.plugin(toJSON);
rssSchema.plugin(paginate);

/**
 * Check if rss is taken
 * @param {string} rss - The rss's rss
 * @param {ObjectId} [excludeRssId] - The id of the user to be excluded
 * @returns {Promise<boolean>}
 */
rssSchema.statics.isUrlTaken = async function (url, excludeRssId) {
  const rss = await this.findOne({ url, _id: { $ne: excludeRssId } });
  return !!rss;
};

/**
 * @typedef Rss
 */
const Rss = mongoose.model('Rss', rssSchema);

module.exports = Rss;
