const path = require('path')
const dotenv = require('dotenv')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const environmentVariables = dotenv.config({ path: '.env' }).parsed || {}

const plugins = []

const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, 'public', 'index.html'),
  favicon: path.resolve(__dirname, 'public', 'logo.png'),
})
const envPlugin = new webpack.DefinePlugin({
  'process.env': JSON.stringify(environmentVariables),
})

plugins.push(HTMLWebpackPluginConfig, envPlugin)

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    alias: {
      config: path.resolve(__dirname, 'config'),
      services: path.resolve(__dirname, 'src', 'services'),
      constants: path.resolve(__dirname, 'src', 'constants'),
      atoms: path.resolve(__dirname, 'src', 'components', 'atoms'),
      molecules: path.resolve(__dirname, 'src', 'components', 'molecules'),
      organisms: path.resolve(__dirname, 'src', 'components', 'organisms'),
      pages: path.resolve(__dirname, 'src', 'components', 'pages'),
      templates: path.resolve(__dirname, 'src', 'components', 'templates'),
      ducks: path.resolve(__dirname, 'src', 'store', 'ducks'),
    },
    extensions: ['.js', '.jsx'],
  },
  plugins,
}
