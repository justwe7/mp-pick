<template>
  <view class="home-wrapper">
    <image src="../../assets/img/tutu-big.png" mode="widthFix" class="a-rabbit-img-big"></image>
    <image src="../../assets/img/slogan.png" mode="widthFix" class="a-slogan-img-big"></image>
    <image src="../../assets/img/icon-1.png" mode="widthFix" class="a-icon-1"></image>

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
    <view class="g-control">
      <!-- <AtButton type="primary" size="small" @click="handleClick"> {{ onOff ? '结束' : '开始' }}</AtButton> -->
      <xButton type="pulse" class="f-mr-80" @tap="$location.to('/pages/user/user')">配置</xButton>
      <!-- <xButton type="pulse" class="f-mr-80" @tap="isShowDrawer = !isShowDrawer">配置</xButton> -->
      <xButton type="raise" @tap="handleClick">{{ onOff ? '结束' : '开始' }}</xButton>
      <!-- <xButton type="fill">开始</xButton>
      <xButton type="pulse">开始</xButton>
      <xButton type="close">开始</xButton>
      <xButton type="raise">开2始</xButton>
      <xButton type="up">开始</xButton>
      <xButton type="offset">开始</xButton> -->
    </view>
    <settingPage v-model="isShowDrawer" :data="list"></settingPage>
  </view>
</template>

<script>
import { ref } from 'vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
import xButton from '../../components/XButton.vue'
// import NumberDisplay from '../../components/NumberDisplay.vue'
// import NumberSubmit from '../../components/NumberSubmit.vue'
import settingPage from './components/settingDrawer.vue';

const colorArr = ['#0a1931', '#fff', '#f7fd04', '#21094e', '#f55c47', '#344fa1', '#cf0000', '#5b6d5b', '#f58634', '#3c415c', '#fff600', '#26001b', '#ff005c']

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
      onOff: false,
      isShowDrawer: false,
      cur: 0,
      fontColorIdx: 0,
      fontColorArr: ['#fff'],
      list: []
    }
  },
  onShow () {
    this.list = this.randomList.slice(0)
    // console.log(this.$location.to('/pages/user/user'))
    // Taro.navigateTo('pages/user/user')
  },
  onLoad () {
    this.initFontColor()
  },
  methods: {
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
      this.onOff = !this.onOff
    },
    runStart () {
      const maxLen = this.list.length - 1
      this.cur++
      timer = setInterval(() => {
        this.cur++
        this.fontColorIdx++
        this.cur > maxLen && (this.cur = 0)
      }, 150);
    },
    runStop () {
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
    settingPage
  }
}
</script>

<style lang="scss">
page {
  background-color: #f8f5c3;
  background: #f8f5c3 url('../../assets/img/bg.png') no-repeat center bottom / cover;
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
      width: 96rpx * 0.9;
      height: 84rpx * 0.9;
      left: 50%;
      transform: translateX(-50%);
      bottom: 170rpx;
    }
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
