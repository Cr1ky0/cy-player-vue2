const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const resolvePath = (dir) => path.resolve(__dirname, dir);
module.exports = {
  transpileDependencies: true,
  chainWebpack(config) {
    // 移除HTML相关的插件
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');
    // svg
    config.module
      .rule('svg')
      .exclude.add(resolvePath('src/assets/icons/svg'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolvePath('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end();
  },
  css: {
    extract: false,
  },
  configureWebpack: {
    optimization: {
      splitChunks: false, // 禁用代码分割
    },
    entry: {
      app: './src/index.js',
    },
    output: {
      filename: 'index.js',
      libraryTarget: 'umd',
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: 'README.md', to: '' },
          { from: 'package.json', to: '' },
        ],
      }),
    ],
  },
};
