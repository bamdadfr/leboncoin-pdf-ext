const CopyPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlMinimizerPlugin = require('html-minimizer-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const isProduction = process.env.NODE_ENV === 'production';
const path = require('path');

// eslint-disable-next-line no-console
console.log('Production mode is: ', isProduction);

module.exports = (env) => {
  const getBrowserFlavour = () => {
    if (env.chrome === true) {
      return 'chrome';
    } else if (env.firefox === true) {
      return 'firefox';
    }
  };

  return {
    watch: !isProduction,
    mode: isProduction ? 'production' : 'development',
    devtool: isProduction ? false : 'inline-source-map',
    entry: {
      'scripts/background': './src/app/background.ts',
      'scripts/content': './src/app/content.ts',
      'scripts/popup': './src/app/popup.ts',
    },
    output: {
      path: path.resolve(__dirname, `dist/${getBrowserFlavour()}`),
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    node: false,
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: `./src/manifest-${getBrowserFlavour()}.json`,
            to: 'manifest.json',
          },
          {
            from: './src/assets',
            to: 'assets',
          },
          {
            from: './src/popup',
            to: 'popup',
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin(),
        new HtmlMinimizerPlugin(),
        new CssMinimizerPlugin(),
      ],
    },
  };
};
