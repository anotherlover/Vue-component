const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  lintOnSave: true,
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@$', resolve('src'))
      .set('views', resolve('src/views'))
      .set('baseComponents', resolve('src/baseComponents'))
  },
  configureWebpack: {
    externals: {
      'CKEDITOR': 'window.CKEDITOR'
    }
  }
}
