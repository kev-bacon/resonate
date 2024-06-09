const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const path = require('path');

module.exports = override(
  addWebpackAlias({
    'os': require.resolve('os-browserify'),
    'path': require.resolve('path-browserify')
  }),
  addWebpackPlugin(new NodePolyfillPlugin())
);
