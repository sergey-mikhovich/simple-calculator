const path = require('path');
const { buildWebpack } = require('./config/build/build-webpack');

module.exports = (env) => {
    const paths = {
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: path.resolve(__dirname, 'dist'),
        html: path.resolve(__dirname, 'public', 'index.html'),
    }

    return buildWebpack({
        mode: env.mode ?? 'development',
        port: env.port ?? 3000,
        paths
    })
};
