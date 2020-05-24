module.exports = { 
  devServer: { 
    proxy: { 
      '/api': { 
        target: 'http://localhost:3000/api',
        changeOrigin: true, 
        pathRewrite: { 
          '^/api': ''
        } 
      } 
    },
    historyApiFallback: {
      index: `/index.html`,
    },
  },
  outputDir: '../backend/public', 
}