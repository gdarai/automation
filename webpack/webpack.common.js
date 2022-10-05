const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const paths = {
  src: path.resolve(__dirname, 'src'),
  test: path.resolve(__dirname, 'test'),
  template: path.resolve(__dirname, 'src', 'index.pug'),
  out: path.resolve(__dirname, 'dist'),
};

module.exports = env => merge([
  {
    context: paths.src,
    entry: ['./index.tsx'],
    output: {
      path: paths.out,
      publicPath: '/prisma_auction_tool',
      filename: '[fullhash].js',
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.jsx'],
      modules: ['node_modules'],
      alias: {
        app: paths.src,
        test: paths.test,
      },
    },
    module: {
      rules: [
        { test: /\.css/, use: ['style-loader', 'css-loader'] },
        { test: /\.jsx?$/, use: ['babel-loader'], exclude: /node_modules/ },
        { test: /\.pug$/, use: ['pug3-loader'] },
        {
          test: /\.svg$/,
          exclude: /node_modules/,
          use: [
            { loader: 'babel-loader' },
            {
              loader: 'react-svg-loader',
              options: { jsx: true }, // true outputs JSX tags
            },
          ],
        },
        {
          test: /\.(jpg|png|ico)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[hash].[ext]',
                outputPath: env.production ? '/' : '',
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                name: '[name].[ext]',
                outputPath: '/fonts/',
              },
            },
          ],
        },
        { test: require.resolve('snapsvg'), use: ['imports-loader?this=>window,fix=>module.exports=0'] },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ['ts-loader'],
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: 'react',
      }),
      new HtmlWebpackPlugin({
        hash: true,
        template: paths.template,
        favicon: '../assets/favicon.ico',
      }),
      new webpack.DefinePlugin({
        'process.env.BUILDHASH': JSON.stringify(env.BUILDHASH || 'noHASH'),
        'process.env.BUILDTIME': JSON.stringify(env.BUILDTIME || null),
        'process.env.BUILDVERSION': JSON.stringify(env.BUILDVERSION || 'x.x.x'),
        ...{ routerBrowserMode: process.env.ROUTER_BROWSER_MODE === 'true' },
      }),
    ],
    externals: {
      cheerio: 'window',
      'react/addons': 'react',
      'react/lib/ExecutionEnvironment': 'react',
      'react/lib/ReactContext': 'react',
    },
  },
]);
