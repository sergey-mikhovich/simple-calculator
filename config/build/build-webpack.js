const { buildDevServer } = require('./build-dev-server');
const { buildPlugins } = require('./build-plugins');
const { buildLoaders } = require('./build-loaders');

function buildWebpack(options) {
  const isDev = options.mode === 'development';

  return {
    mode: options.mode ?? 'development',
    entry: options.paths.entry,
    output: {
      path: options.paths.output,
      filename: '[name].[contenthash].js',
      clean: true
    },
    devServer: isDev ? buildDevServer(options) : undefined,
    plugins: buildPlugins(options),
    resolve: {
      extensions: ['.js'],
    },
    module: {
      rules: buildLoaders(options),
    },
  }
}

module.exports = {
  buildWebpack
}