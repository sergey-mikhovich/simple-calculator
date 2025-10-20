function buildDevServer(options) {
  return {
    open: true,
    host: 'localhost',
    port: options.port,
  }
}

module.exports = {
  buildDevServer
}