const path = require('path')

module.exports = {
  outputDir: './build',
  publicPath: './',
  //链式编程
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', path.resolve(__dirname, 'src'))
      .set('views', '@/views')
      .set('component', '@/component')
  }
}
