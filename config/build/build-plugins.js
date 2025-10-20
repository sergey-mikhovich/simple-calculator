const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function buildPlugins(options) {
  const isDev = options.mode === 'development';

  const plugins = [
    new HtmlWebpackPlugin({
      template: options.paths.html,
    }),

    new ESLintPlugin({
      extensions: ['js'],
      fix: true,
      emitWarning: true,
      emitError: true,
      failOnError: !isDev,
    }),
  ]

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css',
      })
    )

  }

  return plugins
}

module.exports = {
  buildPlugins,
}