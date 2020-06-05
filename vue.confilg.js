module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    },
    devServer: {
      proxy: {
        proxyTable: {
          "/api":{
            target: 'http://localhost:8000',
            changeOrigin: true,
            pathRewrite: {
              '^/api': '/'
            }
          }
        }
      }
    }
  }

}






