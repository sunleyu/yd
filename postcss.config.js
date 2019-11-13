module.exports = {
  plugins: {
    // 私有前缀配置
    autoprefixer: {},
    // rem配置 postcss-pxtorem自动转换rem
    // 使用amfe-flexble设置基准值

    'postcss-pxtorem': {
      // rem换算基准值
      rootValue: 37.5,
      propList: ['*']
    }

  }
}
