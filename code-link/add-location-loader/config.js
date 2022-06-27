const path = require('path')
module.exports = function(config) {
  //vue-code-link
  if (process.env.NODE_ENV === 'development') {
    let projectBasePath = __dirname.substring(0, __dirname.search('code-link'))
    let srcBasePath = path.join(projectBasePath, 'src')
    // 本地开发环境
    config.module
      .rule('vue-code-link')
      .test(/\.vue/).pre()
      .include.add(srcBasePath).end()
      .use(path.join(projectBasePath, 'code-link/add-location-loader'))
      .loader(path.join(projectBasePath, 'code-link/add-location-loader'))
      .end()
  }
}
