const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const resolvePath = (dir) => path.resolve(__dirname, dir);
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack(config) {
    config.module
      .rule('svg')
      .exclude.add(resolvePath('src/assets/icons/svg'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolvePath('src/assets/icons/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()
  },
});
