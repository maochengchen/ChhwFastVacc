module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      "/api": {
        target: "http://59.120.83.25:8992/HisAPI", 
        changeOrigin: true, 
        pathRewrite: {
          "^/api": "", // 重写路径，将/api去掉
        },
      },
    },
  },
};
