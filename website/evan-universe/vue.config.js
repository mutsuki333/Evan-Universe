// vue.config.js
module.exports = {
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/Evan-Universe/'
    : '/',
    configureWebpack: {
      devtool: 'source-map'
    }
}
