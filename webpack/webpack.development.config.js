const bodyParser = require('body-parser');
const util = require('util');
const exec = util.promisify(require('child_process').exec);

const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const cssLoaderQuery = ['modules'];

cssLoaderQuery.push('localIdentName=[folder]---[local]---[hash:base64]');

const PORT = process.env.PORT || 3000;
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const devConfiguration = () => merge([
  {
    mode: 'development',
    devtool: 'source-map',
    devServer: {
      port: PORT,
      historyApiFallback: {
        rewrites: [
          { from: /^\/prisma_auction_tool\/(?!.*?(?:services|v2\/services|logout|cGFzc3dk|FileTransferServlet)).*$/, to: '/prisma_auction_tool/index.html' },
        ],
        // verbose: true,
        disableDotRule: true,
      },
      proxy: [
        {
          context: ['/prisma_auction_tool/services',
            '/prisma_auction_tool/v2/services',
            '/prisma_auction_tool/logout',
            '/prisma_auction_tool/cGFzc3dk',
            '/prisma_auction_tool/FileTransferServlet'],
          target: 'https://localhost:8443',
          secure: false,
          changeOrigin: true,
        },
      ],
      setupMiddlewares(middlewares, devServer) {
        const app = devServer.app;
        app.use(bodyParser.urlencoded({ extended: true }));

        app.get('/', async (req, res) => {
          res.redirect(302, '/prisma_auction_tool/index.html');
        });

        app.post('/prisma_auction_tool/login', async (req, res, next) => {
          const body = `username=${req.body.username}&password=${req.body.password}&submit=${req.body.submit}`;

          const authServerBaseUrl = 'https://localhost:8443';
          try {
            // eslint-disable-next-line no-unused-vars
            const { stdout, stderr } = await exec(`curl -D - -s '${authServerBaseUrl}/prisma_auction_tool/login'
               -H 'Connection: keep-alive'
               -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/97.0.4692.71 Safari/537.36'
               -H 'X-XSRF-TOKEN: undefined'
               -H 'Content-Type: application/x-www-form-urlencoded;charset=UTF-8'
               -H 'Accept: */*'
               -H 'Sec-GPC: 1'
               -H 'Origin: ${authServerBaseUrl}'
               -H 'Sec-Fetch-Site: same-origin'
               -H 'Sec-Fetch-Mode: cors'
               -H 'Sec-Fetch-Dest: empty'
               -H 'Referer: ${authServerBaseUrl}/prisma_auction_tool/index.html'
               -H 'Accept-Language: en-US,en;q=0.9'
               --data-raw '${body}'
               --compressed
               --insecure`.replaceAll(/[\r\n]+/g, ' '));

            const matches = stdout.match(/Set-Cookie: (.+)/g);
            const cookies = matches
              .map(match => /Set-Cookie: (.+)/.exec(match))
              .map(array => array[1]); // extract right part (the cookie)

            console.info(`Cookies: ${JSON.stringify(cookies)}`);
            res.header('Set-Cookie', cookies);
            const newLocation = /Location: (.*)/.exec(stdout)[1];
            res.redirect(302, newLocation === '/prisma_auction_tool/' ? '/prisma_auction_tool/app.html' : newLocation);
          } catch (err) {
            console.error(err);
            next(err);
          }
        });
        return middlewares;
      },
    },
  },
]);

module.exports = (env) => {
  if (typeof env === 'undefined') {
    // eslint-disable-next-line no-param-reassign
    env = {};
  }
  return merge(commonConfig(env), devConfiguration());
};
