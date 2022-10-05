const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const cssLoaderQuery = ['modules'];

cssLoaderQuery.push('localIdentName=[folder]---[local]---[hash:base64]');

const testConfiguration = () => merge([
  {
    mode: 'none',
    devtool: 'eval',
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    output: {
      libraryTarget: 'commonjs2',
    },
    externals: {
      'react': 'commonjs react',
      'react-dom': 'commonjs react-dom',
    },
  },
]);

module.exports = (env) => {
  if (typeof env === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    env = {};
  }
  return merge(commonConfig(env), testConfiguration());
};
