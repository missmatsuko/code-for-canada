const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const glob = require('glob');
const path = require('path');

module.exports = (env, options) => {
  // Get the environment
  const devMode = options.mode !== 'production';

  // Define src and dest paths
  const srcPath = path.join(__dirname, './src');
  const destPath = path.join(__dirname, './public');

  const config = {
    entry: {
      main: './index.js',
    },
    output: { // Built files go here
      filename: '[name].js',
      path: destPath,
      publicPath: '',
    },
    module: { // All the rules that will be applied to your files.
      rules: [
        {
          // Handle Javascript
          test: /\.js$/,
          include: srcPath,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          // Handle styles
          test: /\.css$/,
          use: [
            MiniCssExtractPlugin.loader, // Extract to files on build, load as style tag for dev server
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: () => [
                  autoprefixer, // browserlist should be pulled from package.json
                  cssnano, // Minimize css
                ],
              },
            },
          ],
        },
        // Handle CSV
        {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
            dynamicTyping: true,
            header: true,
            skipEmptyLines: true,
          }
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        title: 'Building Code Violations Summary',
        meta: {
          viewport: 'width=device-width, initial-scale=1',
        },
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css',
      }),
    ],
    optimization: {
      splitChunks: {
        chunks: 'initial',
        automaticNameDelimiter: '-',
      },
      minimizer: [
        new UglifyJsPlugin({
          uglifyOptions: {
            safari10: true,
          },
        }),
      ],
    },
  };

  // If in development mode, add eslint
  if (devMode) {
    config.module.rules.push({
      enforce: 'pre',
      test: /\.js$/,
      include: srcPath,
      loader: 'eslint-loader',
    });
  }

  return config;
};
