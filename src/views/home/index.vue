<template>
  <div class="container">
    <!-- swipeable 是否开启手势滑动切换 -->
    <van-tabs swipeable>
      <van-tab :key="index" v-for="index in 8" :title="'标签 ' + index">
        <div class="scroll-wrapper">
          <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <van-cell v-for="item in articles" :key="item">{{item}}</van-cell>
          </van-list>
        </div>
      </van-tab>
    </van-tabs>
    <span class="bar_btn" slot="nav-right">
      <van-icon name="wap-nav"></van-icon>
    </span>
  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      // 上拉加载中
      upLoading: false,
      // 是否全部加载完成
      finished: false,
      // 文章列表
      articles: []
    }
  },
  methods: {
    onLoad () {
      // 上拉加载
      // onLoad 组件初始化默认执行一次，如果数据对应的页面不够一屏，自动再加载一次。
      // 模拟获取数据，模拟网络延时
      window.setTimeout(() => {
        // 获取数据成功，模拟一下数据
        const data = []
        // 1-10  11-20  21-30 ...
        for (let i = this.articles.length + 1; i < this.articles.length + 11; i++) {
          data.push(i)
          console.log(i)
        }
        // 获取文章列表ok
        this.articles.push(...data)
        // 结束上拉加载效果
        this.upLoading = false
        // 是否所有数据已经加载完毕 （模拟一下，数据超过50就加载完毕）
        if (this.articles.length >= 50) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
// - /deep/  作用：让样式在其他组件生效。
// - 保证 scroll-wrapper 容器能够生成滚动条，将来需要使用滚动。
//   - 下拉刷新
//   - 上拉加载
// - 记录浏览位置
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
