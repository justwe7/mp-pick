<template>
  <view class="home-wrapper">
    <!-- <AtSwitch title='已关闭' :border="false" /> -->
    <image src="../../assets/img/tutu-big.png" mode="widthFix" class="a-rabbit-img-big"></image>
    <image src="../../assets/img/slogan.png" mode="widthFix" class="a-slogan-img-big"></image>
    <image src="../../assets/img/icon-1.png" mode="widthFix" class="a-icon-1"></image>
    <!-- <view class="icon-sprite"></view> -->

    <view class="a-game-box">
      <image src="../../assets/img/game1.png" mode="widthFix" class="u-game-img1"></image>
      <image src="../../assets/img/game2.png" mode="widthFix" class="u-game-img2"></image>
    </view>

    <image src="../../assets/img/title.png" mode="widthFix" class="g-title-img"></image>
    <view class="g-screen">
      <view class="round">
        <image src="../../assets/img/tutu.png" mode="widthFix" class="rabbit-img-s" :class="{'z-ani-filp': onOff}"></image>
      </view>
      <view class="content">
        <view class="glitch" :style="`color: ${fontColorArr[fontColorIdx%fontColorArr.length]}`">
          {{ list[cur] }}
          <!-- <view class="retouch" v-show="onOff">{{ list[cur] }}</view> -->
        </view>
      </view>
      <view class="round">
        <image src="../../assets/img/tutu.png" mode="widthFix" class="rabbit-img-s" :class="{'z-ani-filp': onOff}"></image>
      </view>
      <view class="dot-list">
        <view class="dot"></view>
        <view class="dot"></view>
        <view class="dot"></view>
      </view>
    </view>
    <!-- <button @tap="foo">测试按钮</button> -->

    <view class="g-control" v-if="hasResult">
      <!-- <AtButton type="primary" size="small" @click="handleClick"> {{ onOff ? '结束' : '开始' }}</AtButton> -->
      <!-- <xButton type="pulse" class="f-mr-80" @tap="$location.to('/pages/user/user')">配置</xButton> -->
      <view class="f-pb-20">
        <xButton type="raise" @tap="handleClick" size="big">{{ onOff ? '立即停止' : '现在选择' }}</xButton>
      </view>
      <xButton type="pulse" class="f-mr-30" @tap="$location.to('/pages/user/user')">查看候选菜单</xButton>
      <xButton type="close" class="f-mr-30" @tap="handleArea">切到{{isShowDrawer ? '菜谱' : '餐馆'}}模式</xButton>
      <!-- <xButton type="pulse" class="f-mr-80" @tap="isShowDrawer = !isShowDrawer">配置</xButton> -->
      <!-- <xButton type="fill">开始</xButton>
      <xButton type="pulse">开始</xButton>
      <xButton type="close">开始</xButton>
      <xButton type="raise">开2始</xButton>
      <xButton type="up">开始</xButton>
      <xButton type="offset">开始</xButton> -->
    </view>
    <view class="g-control" v-else>
      <!-- <AtButton type="primary" size="small" @click="handleClick"> {{ onOff ? '结束' : '开始' }}</AtButton> -->
      <!-- <xButton type="pulse" class="f-mr-80" @tap="$location.to('/pages/user/user')">配置</xButton> -->
      <xButton type="pulse" class="f-mr-30" @tap="isAd = true">外卖下单</xButton>
      <!-- <xButton type="pulse" class="f-mr-80" @tap="isShowDrawer = !isShowDrawer">配置</xButton> -->
      <xButton type="raise" @tap="hasResult = !hasResult">不满意，重新选择</xButton>
    </view>

    <AtCurtain
      :isOpened="isAd"
      closeBtnPosition="top-right"
      :onClose="() => {isAd = false}"
    >
      <view class="a-ad-box">
        <view class="ad-block" @tap="handleToMp('meituan')" target="miniProgram" open-type="navigate" :app-id="mpPathInfo.meituan.appid" :short-link="mpPathInfo.meituan.shortLink">
          <image src="https://image.littl.cn/images/2021/06/12/09a5bc8fe849d5f4815a5d8e011d06f0.th.png" mode="widthFix" class="u-ad-img-logo"></image>
          <button class="u-ad-btn" size="mini">美团下单</button>
        </view>
        <view class="ad-block" @tap="handleToMp('ele')" target="miniProgram" open-type="navigate" :app-id="mpPathInfo.ele.appid" :short-link="mpPathInfo.ele.shortLink">
          <image src="https://image.littl.cn/images/2021/06/12/09a5bc8fe849d5f4815a5d8e011d06f0.th.png" mode="widthFix" class="u-ad-img-logo"></image>
          <button class="u-ad-btn" size="mini">饿了么下单</button>
        </view>
      </view>
    </AtCurtain>
    <!-- <AtButton
      :onClick="() => {isAd = false}">
      右上关闭幕帘
    </AtButton> -->
    <!-- <settingPage v-model="isShowDrawer" :data="restaurantList"></settingPage> -->
  </view>
</template>

<script>
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import { AtSwitch, AtCurtain } from 'taro-ui-vue'
import xButton from '../../components/XButton.vue'
// import NumberDisplay from '../../components/NumberDisplay.vue'
// import NumberSubmit from '../../components/NumberSubmit.vue'
// import settingPage from './components/settingDrawer.vue';

const colorArr = ['#0a1931', '#fff', '#f7fd04', '#21094e', '#f55c47', '#344fa1', '#cf0000', '#5b6d5b', '#f58634', '#3c415c', '#fff600', '#26001b', '#ff005c']

const db = wx.cloud.database()
const _ = db.command

const QQMapWX = require('../../lib/qqmap-wx-jssdk.min.js');

let totalCount = 0

// function getCurrentPage () {
//   try {
//     const pages = getCurrentPages()
//     return pages[pages.length - 1]
//   } catch (error) {
//     return ''
//   }
// }

let timer
export default {
  name: 'Home',
  setup () {
    const store = useStore()
    const randomList = computed(() => store.getters.randomList)
    return {
      randomList
    }
  },
  data () {
    return {
      isAd: false,
      hasResult: true,
      onOff: false,
      isShowDrawer: false,
      cur: 0,
      fontColorIdx: 0,
      fontColorArr: ['#fff'],
      list: [],
      restaurantList: [], // 餐馆列表
      // maxIndex: 0,
      qqmapsdk: null,
      lac: '',
      mpPathInfo: {
        meituan: {
          appid: 'wxde8ac0a21135c07d',
          shortLink: '#小程序://美团外卖/美团外卖/8Yg2LcKpfCdMNtr',
          path: '/index/pages/h5/h5?lch=cps:waimai:5:a144a9fa40a42c55af00214bb4bb3993971:14962dingdanxiawaimai:2:70690&f_userId=1&weburl=https%3A%2F%2Fclick.meituan.com%2Ft%3Ft%3D1%26c%3D1%26p%3DOWMpZ-uzIFOVe6JyOONs3dXuqV0qcAf-r-KCvHdXiNfM3oMXlDSgQ1lHQ7sc1bHIMXeq2XWRYP9S3VMvpbQU5suS6wIbvlY8ysKwoMucfvMNkUpDUoZB8UzfJotTLsOtFBVyJPNh84wtIvYJA4YbhskXnQTJHG_vq68uUpWVeXKz1wSjvdQ_u1PJRo5gTASsPjTgdf7BehTj5zPJxndIrav5AnCfNXFwR8xQAaSRU4qhjOcpjdWshmD6IbIfodDtwdi__LfwtUHfPb01QIsqlPSy3VHdhAIZfNEnZStQykvHk-LSdCklNojCZOUbaJwIj9iEPKTi9vRRmaU9gMfeNBmeDP3OfoyXK8-86Y2KqXTKKhrw9HL6lMHqh72xLQoSza5XNhEfc7TfOqswNBK9eA5NRxkYYvFkcrCx1tTHg23zjLO2bIuvv6KfF-1lE3v5AKFAhUB39c2XD46C9em7dM2vW8Knu6-t5MjRD-YxVNp9T01SfjR3VXzNYEBoRkEpG_5pGdZ3wn6E8MJGrfqCXLBWomAqxbiYZ3GLypPSJ_Gk0hLuc8THawjmzP3UqIAtMef6FZYVHv8lqwJ_-h8E8ePYhGq7pN73daDKoKHAz1_QeAZEQ5EG4BqcILt2bqP6KSUv-J212ANX8wE_xtc3tWR8X32YnYsBeDDiQnYCtdrY5khSMPjDtSGfaftjikxO-Gj5xRXlzKWYKqneEv31njAQ5UeE5EqWGRu9MeXfEpjWn98uQEY-eoDqmb63GVWg&f_token=1'
        },
        ele: {
          appid: 'wxece3a9a4c82f58c9',
          shortLink: '#小程序://饿了么l外卖美食超市买菜水果/饿了么/1Q2846KGknjKtWv',
          path: 'ele-recommend-price/pages/guest/index?inviterId=19abb5a2&chInfo=ch_wechat_chsub_CopyLink&_ltracker_f='
        }
      }
    }
  },
  computed: {
    maxIndex () {
      return this.list.length - 1 || 0
    }
  },
  onShow () {
    this.list = this.randomList.slice(0)
    // this.maxIndex = this.list.length - 1
  },
  onLoad () {
    // this.fetchPromote()
    this.initFontColor()

    this.qqmapsdk = new QQMapWX({
        key: '5RZBZ-BVBK5-U43I5-Q5RMN-HFOYH-LLFZR'
    });

    // wx.getLocation().then(res => {
    //     // console.log(res)
    //     if (res.errMsg !== 'getLocation:ok') {
    //       return false
    //     }
    //     this.lac = `${res.latitude},${res.longitude}`
    // })
  },
  onUnload () {
    this.runStop()
  },
  methods: {
    handleToMp (plantform) {
      wx.navigateToMiniProgram({
        appId: this.mpPathInfo[plantform].appid,
        shortLink: this.mpPathInfo[plantform].shortLink,
        success: (res) => {
          this.isAd = false
        }
      })
    },
    fetchPromote () { // 推广云函数
      this.$api.cf({name: 'demo'}).then(res => {
        console.log('log-meituan: ', res)
        const meituan = res?.meituan?.we_app_info
        if (meituan) {
          this.mpPathInfo.meituan.path = meituan.page_path
        }
      })
    },
    foo () {
      wx.cloud.callFunction({
        name: 'demo',
        config: {
          // env: 'local-4gnqjrqm20b167de'
        },
        complete: res => {
          console.log('callFunction test result: ', res.result)
        }
      })
    },
    async handleArea () {
      if (!this.lac) {
        let res
        try {
          res = await wx.getLocation()
        } catch (error) {
          res = {}
        }
        if (res.errMsg !== 'getLocation:ok') {
          wx.showModal({
            title: '提示',
            content: '获取定位信息失败，请打开定位授权并重启小程序',
            success: () => {
              wx.openSetting({
                success: (res) => {
                  wx.getLocation().then(res => {
                    if (res.errMsg !== 'getLocation:ok') {
                      return false
                    }
                    this.lac = `${res.latitude},${res.longitude}`
                  })
                }
              })
            }
          })
          return false
        }
        this.lac = `${res.latitude},${res.longitude}`
      }
      this.isShowDrawer = !this.isShowDrawer
      this.cur = 0
      if (!this.isShowDrawer) {
        this.list = this.randomList.slice(0)
        return false
      }
      let pageNum = 1
      wx.showLoading()

      let totalPage = ~~(totalCount / 20) || 5

      let isFetchArr = []
      const getPage = () => {
        let curPage = ~~(Math.random()*100)%totalPage || 1
        while (isFetchArr.includes(curPage) || curPage > 5) {
          curPage = ~~(Math.random()*100)%totalPage || 1
        }
        isFetchArr.push(curPage)
        return curPage
      }

      const fetchList = (size) => {
        return new Promise((resolve, reject) => {
          this.qqmapsdk.search({
            keyword: '饭店',
            page_size: 20,
            location: this.lac,
            // location: `${res.latitude},${res.longitude}`,
            region_fix: 1,
            page_index: getPage(),
            success: (res) => {
              // console.log(res);
              totalCount = res.count
              // this.restaurantList = res.data.map(item => item.title)
              // this.list = this.restaurantList
              // wx.hideLoading()
              resolve(res.data.map(item => item.title))

            },
            fail: (res) => {
              // console.log(res);
              // wx.hideLoading()
              reject(res)
            }
          });
        })
      }
      Promise.all([fetchList(), fetchList()]).then(listArr => {
        const list = listArr.reduce((result, target) => {
          result.push(...target)
          return result
        }, [])
        this.restaurantList = list
        this.list = list
        wx.hideLoading()
      }).catch(err => {
        wx.hideLoading()
      })

      // this.qqmapsdk.search({
      //   keyword: '美食',
      //   page_size: 20,
      //   location: this.lac,
      //   // location: `${res.latitude},${res.longitude}`,
      //   region_fix: 1,
      //   page_index: [1,2,3][+new Date%3],
      //   success: (res) => {
      //     console.log(res);
      //     totalCount = res.count
      //     this.restaurantList = res.data.map(item => item.title)
      //     this.list = this.restaurantList
      //     wx.hideLoading()

      //   },
      //   fail: (res) => {
      //     console.log(res);
      //     wx.hideLoading()
      //   }
      // });
    },
    initFontColor () {
      this.fontColorIdx = 0
      this.fontColorArr = colorArr.sort(() => Math.random() - 0.5)
    },
    handleClick () {
      if (this.onOff) {
        this.runStop()
        } else {
        this.initFontColor()
        this.runStart()
      }
    },
    runStart () {
      this.list = this[this.isShowDrawer ? 'restaurantList' : 'randomList'].slice(0).sort(() => Math.random() - 0.5)
      timer = setInterval(() => {
        this.cur++
        this.fontColorIdx++
        this.cur > this.maxIndex && (this.cur = 0)
      }, 100);
      this.onOff = true
    },
    runStop () {
      this.onOff = false
      this.hasResult = false
      clearInterval(timer)
    },
    onDrawerClose () {

    }
  },
  components: {
    // NumberDisplay,
    // NumberSubmit,
    // AtButton,
    // AtDrawer,
    xButton,
    // settingPage,
    // AtSwitch,
    AtCurtain
  },
  onShareAppMessage: function (res) {
    return {
      title: '你在纠结什么？一起来搞颜色吧！',
      path: 'pages/index/index',
      imageUrl: 'https://image.littl.cn/images/2021/06/12/-1.png'
    }
  },
  onShareTimeline: function (res) {
    return {
      title: '你在纠结什么？一起来搞颜色吧！',
      imageUrl: 'https://image.littl.cn/images/2021/06/12/09a5bc8fe849d5f4815a5d8e011d06f0.th.png'
    }
  }
}
</script>

<style lang="scss">
@import "~taro-ui-vue/dist/style/components/switch.scss";
@import "~taro-ui-vue/dist/style/components/curtain.scss";
page {
  background-color: #f8f5c3;
  background: #f8f5c3 url('../../assets/img/bg.png') no-repeat center bottom / cover;
}
.a-ad-box {
  display: flex;
  justify-content: space-around;
  padding: 30rpx 20rpx;
  background-color: #f9f3f3;
  border-radius: 11rpx;
  .ad-block {
    flex-basis: 40%;
    .u-ad-img-logo {
      @extend %centerblock;
      margin-bottom: 10rpx;
      width: 50rpx;
      height: 50rpx;
    }
    .u-ad-btn {
      min-width: 3rpx;
      background-color: #fed049;
    }
  }
}
.home-wrapper {
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  @at-root {
    .g-box {
      position: relative;
      @extend %centerblock;
      width: 600rpx;
      border: 1px solid #000;
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        margin: 0 auto;
        width: 100%;
        z-index: 3;
        transform: translateZ(0);
        background-image: linear-gradient(to bottom,rgba(255,255,255,.95),rgba(255,255,255,.6)),linear-gradient(to top,rgba(255,255,255,.95),rgba(255,255,255,.6));
        background-position: top,bottom;
        background-size: 100% 40%;
        background-repeat: no-repeat;
      }
    }
    .g-title-img {
      margin: 10rpx 0 40rpx;
      width: 66%;
    }
    .g-screen {
      position: relative;
      @extend %centerblock;
      width: 90vw;
      padding: 0 7rpx;
      height: 200rpx;
      // background-color: #f3a5a5;
      border: 18rpx solid rgba($color: #221815, $alpha: 0.8);
      background-color: rgba($color: #f3a5a5, $alpha: 0.6);
      position: relative;
      @extend %centerblock;
      display: flex;
      align-items: center;
      .dot-list {
        position: absolute;
        bottom: -70rpx;
        left: 0;
        width: 100%;
        text-align: center;
        .dot {
          margin: 0 20rpx;
          display: inline-block;
          width: 25rpx;
          height: 25rpx;
          border-radius: 50%;
          &:nth-of-type(1) {
            background-color: #f5e23d;
          }
          &:nth-of-type(2) {
            background-color: #71c8d9;
          }
          &:nth-of-type(3) {
            background-color: #ea8d41;
          }
        }
      }
      .content {
        // align-self: stretch;
        flex-basis: 70%;
        // .btn {

        // }
      }
      .round {
        flex-basis: 15%;
        image {
          width: 100%;
        }
      }
      // .text-content {
      //   top: 200rpx;
      //   position: absolute;
      //   width: 60%;
      //   right: 0;
      //   // float: right;
      // }
    }
    .g-control {
      padding: 80rpx 30rpx 10rpx;
      position: relative;
      @extend %centerblock;
      // display: flex;
      text-align: center;
      width: 90vw;
      height: 300rpx;
    }
    .a-game-box {
      opacity: 0.8;
      z-index: -1;
      position: absolute;
      bottom: 550rpx;
      left: 0;
      width: 100%;
      // text-align: center;
      .u-game-img1 {
        position: absolute;
        left: 70rpx;
        width: 120rpx;
        top: 20rpx;
      }
      .u-game-img2 {
        position: absolute;
        right: 50rpx;
        width: 120rpx;
      }
    }
    .a-rabbit-img-big {
      opacity: 0.9;
      position: absolute;
      width: 25%;
      left: 80rpx;
      bottom: 30rpx;
      // transform: rotateY(180deg);
    }
    .a-slogan-img-big {
      position: absolute;
      width: 35%;
      right: 50rpx;
      bottom: 50rpx;
    }
    .a-icon-1 {
      position: absolute;
      width: 88rpx * 0.9;
      height: 77rpx * 0.9;
      left: 50%;
      transform: translateX(-50%);
      bottom: 170rpx;
    }
    // .icon-sprite {
    //   position: absolute;
    //   width: 92.4rpx;
    //   height: 55rpx;
    //   left: 50%;
    //   transform: translateX(-50%);
    //   bottom: 170rpx;
    //   background-color: red;
    //   background: url('../../assets/img/icon-sprite.png') no-repeat / 462rpx 385rpx;
    //   background-position: 0 0;
    // }
  }
}
@keyframes filp180 {
  0% {
    transform: rotateY(0);
  }
  50% {
    transform: rotateY(0);
  }
  50.1% {
    transform: rotateY(180deg);
  }
  100% {
    transform: rotateY(180deg);
  }
}
.z-ani-filp {
  animation: filp180 0.5s infinite linear;
}

.glitch{
  color:#fff;
  // color:white;
  font-size: 48rpx;
  position: relative;
}
@keyframes noise-anim{
  $steps:20;
  @for $i from 0 through $steps{
    #{percentage($i*(1/$steps))}{
      clip:rect(random(100)+px,9999px,random(100)+px,0);
    }
  }
}
.retouch{
  position:absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 3rpx;
  text-shadow: -1rpx 0 red;
  top:0;
  color:white;
  background:#000;
  overflow:hidden;
  clip:rect(0,900px,0,0);
  animation:noise-anim 2s infinite linear alternate-reverse;
}

@keyframes noise-anim-2{
  $steps:20;
  @for $i from 0 through $steps{
    #{percentage($i*(1/$steps))}{
      clip:rect(random(100)+px,9999px,random(100)+px,0);
    }
  }
}
.glitch:before{
  content:attr(data-text);
  position:absolute;
  left:-2px;
  text-shadow:1px 0 blue;
  top:0;
  color:white;
  background:black;
  overflow:hidden;
  clip:rect(0,900px,0,0);
  animation:noise-anim-2 3s infinite linear alternate-reverse;
}
</style>
