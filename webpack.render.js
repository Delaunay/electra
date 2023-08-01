import webpack from 'webpack';
import merge from 'webpack-merge';
import BabiliPlugin from 'babili-webpack-plugin';
import baseConfig from './webpack.config.base';

export default merge(baseConfig, {
  devtool: 'source-map',
  entry: ['babel-polyfill', './app/main.development'],
  output: {
    filename: './main.js'
  },
  plugins: [
    new BabiliPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],

  /**
   * https://github.com/chentsulin/webpack-target-electron-renderer#how-this-module-works
   */
  target: 'electron-main',
  node: {
    __dirname: false,
    __filename: false
  },
});