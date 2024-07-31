const path = require('path');
const resolvePath = (dir) => path.resolve(__dirname, dir);
module.exports = {
  transpileDependencies: true,
  configureWebpack: {
    entry: {
      app: resolvePath('./example/main.js') // 指定新的入口文件路径
    }
  },
  // 修改开发服务器的设置，使其能正确地提供 `index.html`
  devServer: {
    static: {
      directory:resolvePath( 'example'), // 更新为使用 static
    }
  },
  chainWebpack(config) {
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

    config.plugin('html')
      .tap(args => {
        args[0].template = resolvePath( './example/index.html');
        return args;
      });
  },
};
