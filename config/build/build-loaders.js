const MiniCssExtractPlugin = require("mini-css-extract-plugin");

function buildLoaders(options) {
  const isDev = options.mode === 'development';

  return [
    {
      test: /\.(js)$/i,
      loader: 'babel-loader',
    },
    {
      test: /\.css$/i,
      use: [
        isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader'
      ],
    },
  ]
}

module.exports = {
  buildLoaders
}