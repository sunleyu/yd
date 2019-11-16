<template>
  <div class="container">
    <!-- swipeable 是否开启手势滑动切换 -->
    <van-tabs swipeable>
      <van-tab :key="index" v-for="index in 8" :title="'标签 ' + index">
        <div class="scroll-wrapper">
          <van-pull-refresh
            v-model="downLoading"
            @refresh="onRefresh"
            :success-text="refreshSuccessText"
          >
            <van-list v-model="upLoading" :finished="finished" finished-text="没有更多了" @load="onLoad">
              <van-cell v-for="item in articles" :key="item">
                <div class="article_item">
                  <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
                  <!-- 3图 -->
                  <div class="img_box">
                    <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                    <van-image class="w33" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                  </div>
                  <div class="info_box">
                    <span>你像一阵风</span>
                    <span>8评论</span>
                    <span>10分钟前</span>
                    <span class="close">
                      <van-icon name="cross"></van-icon>
                    </span>
                  </div>
                </div>
                <!-- 1图 -->
                <div class="article_item">
                  <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>
                  <div class="img_box">
                    <van-image class="w100" fit="cover" src="https://img.yzcdn.cn/vant/cat.jpeg" />
                  </div>
                  <div class="info_box">
                    <span>你像一阵风</span>
                    <span>8评论</span>
                    <span>10分钟前</span>
                    <span class="close">
                      <van-icon name="cross"></van-icon>
                    </span>
                  </div>
                </div>
                <!-- 没图 -->
                <div class="article_item">
                  <h3 class="van-ellipsis">PullRefresh下拉刷新PullRefresh下拉刷新下拉刷新下拉刷新</h3>

                  <div class="info_box">
                    <span>你像一阵风</span>
                    <span>8评论</span>
                    <span>10分钟前</span>
                    <span class="close">
                      <van-icon name="cross"></van-icon>
                    </span>
                  </div>
                </div>
              </van-cell>
            </van-list>
          </van-pull-refresh>
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
      articles: [],
      // 是否正在下拉刷新中
      downLoading: false,
      // 刷新成功的文案
      refreshSuccessText: null
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
        for (
          let i = this.articles.length + 1;
          i < this.articles.length + 11;
          i++
        ) {
          data.push(i)
          // console.log(i)
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
    },
    onRefresh () {
      // 下拉刷新
      // onRefresh 在下拉后 松手后 触发的函数 （获取数据，替换，进行列表渲染）
      // 获取数据 (获取到了数据，获取不到数据--->提示“暂无更新”,不需要替换列表)
      window.setTimeout(() => {
        // 获取数据成功
        const data = [1, 2, 3, 4, 5, 6]
        // const data = []
        // 结束下拉刷新效果
        this.downLoading = false
        if (data.length) {
          this.articles = data
          // 加载有数据的文案
          this.refreshSuccessText = '更新成功'
          // 防止看到 没有更多了 信息 （重新刷新列表，下一页应该是有数据的）
          this.finished = false
          // 防止数据不够一屏 再来一次上拉加载数据 onLoad
          this.onLoad()
        } else {
          // 加载没有数据的文案
          this.refreshSuccessText = '暂无更新'
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
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
