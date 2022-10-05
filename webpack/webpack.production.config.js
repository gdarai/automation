const commonConfig = require('./webpack.common.js');
const { merge } = require('webpack-merge');

const cssLoaderQuery = ['modules'];

cssLoaderQuery.push('localIdentName=[folder]---[local]---[hash:base64]');


const prodConfiguration = () => merge([
  {
    mode: 'production',
  },
]);

module.exports = (env) => {
  if (typeof env === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    env = {};
  }
  return merge(commonConfig(env), prodConfiguration());
};
