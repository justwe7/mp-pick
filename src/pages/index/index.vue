<template>
  <view class="home-wrapper">
    <!-- <view class="banner">
      <image src="../../assets/img/title.png" mode="widthFix" class="title-img"></image>
    </view> -->
    <!-- <button class="x-button pulse">xxcv</button> -->
    <!-- <div class="buttons">
      <button class="fill">Fill In</button>
      <button class="pulse">Pulse</button>
      <button class="close">Close</button>
      <button class="raise">Raise</button>
      <button class="up">Fill Up</button>
      <button class="slide">Slide</button>
      <button class="offset">Offset</button>
    </div> -->
    <image src="../../assets/img/tutu-big.png" mode="widthFix" class="rabbit-img-big"></image>
    <image src="../../assets/img/slogan.png" mode="widthFix" class="slogan-img-big"></image>
    <view class="g-block-wrapper">
      <image src="../../assets/img/title.png" mode="widthFix" class="title-img"></image>
      <view class="m-screen">
        <view class="round">
          <image src="../../assets/img/tutu.png" mode="widthFix" class="rabbit-img-s" :class="{'z-ani-filp': onOff}"></image>
        </view>
        <view class="content">
          <view class="glitch">
            {{ list[cur] }}
            <view class="retouch" v-show="onOff">{{ list[cur] }}</view>
          </view>
          <!-- <view>{{ list[cur] }}</view> -->
            <!-- <text class="text">开</text>
            <text class="text">始</text> -->
        </view>
        <view class="round">
          <image src="../../assets/img/tutu.png" mode="widthFix" class="rabbit-img-s" :class="{'z-ani-filp': onOff}"></image>
        </view>
        <!-- <view class="text-content">{{ list[cur] }}</view> -->
        <view class="dot-list">
          <view class="dot"></view>
          <view class="dot"></view>
          <view class="dot"></view>
        </view>
      </view>
      <view class="g-control">
        <!-- <AtButton type="primary" size="small" @click="handleClick"> {{ onOff ? '结束' : '开始' }}</AtButton> -->
        <xButton :type="onOff ? 'pulse' : 'close'" @tap="handleClick">{{ onOff ? '结束' : '开始' }}</xButton>
      </view>
    </view>
    <!-- <view class="a-round"></view> -->
<!-- <div class="main">
    <span class="stand"></span>
    <div class="cat">
     <div class="body"></div>
     <div class="head">
       <div class="ear"></div>
     <div class="ear"></div>
     </div>
     <div class="face">
      <div class="nose"></div>
     <div class="whisker-container">
       <div class="whisker"></div>
       <div class="whisker"></div>
     </div>
     <div class="whisker-container">
       <div class="whisker"></div>
       <div class="whisker"></div>
     </div>
     </div>
     <div class="tail-container">
      <div class="tail">
        <div class="tail">
          <div class="tail">
            <div class="tail">
              <div class="tail">
                <div class="tail">
                  <div class="tail"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     </div>
   </div>
</div> -->

    <!-- <view class="g-box f-mb-10">
      <view class="mask"></view>
      <view class="list-item">{{ list[cur] }}</view>
    </view> -->
    <!-- <AtButton type="primary" size="small" @click="bar">结束</AtButton> -->
    <!-- <view class="glitch">今晚打老虎
      <view class="retouch">今晚打老虎</view>
    </view> -->
    <!-- <button class="button regular">xxx</button> -->
    <!-- <NumberDisplay/>
    <NumberSubmit/> -->
  </view>
</template>

<script>
import xButton from '../../components/XButton.vue'
import NumberDisplay from '../../components/NumberDisplay.vue'
import NumberSubmit from '../../components/NumberSubmit.vue'
import { AtButton } from 'taro-ui-vue'
import moduleName from './index.config';
let timer
export default {
  name: 'Home',
  data () {
    return {
      onOff: false,
      cur: 0,
      list: [
        '北京烤鸭',
        '特色小龙虾',
        '串串香',
        '肉夹馍',
        '牛羊肉泡馍',
        '麻辣凉皮',
        '汉中热米皮',
        '肉丸糊辣汤',
        '水盆羊肉',
        '凉皮',
        '乾县锅盔',
        '辣子锅盔',
        '葫芦头泡馍',
        '金线油塔'
      ]
    }
  },
  mounted () {
    console.log(moduleName)
  },
  methods: {
    handleClick () {
      console.log(222)
      if (this.onOff) {
        this.bar()
        } else {
        this.foo()
      }
      this.onOff = !this.onOff
    },
    foo () {
      const maxLen = this.list.length - 1
      this.cur++
      timer = setInterval(() => {
        this.cur++
        this.cur > maxLen && (this.cur = 0)
      }, 150);
    },
    bar () {
      clearInterval(timer)
    }
  },
  components: {
    NumberDisplay,
    NumberSubmit,
    AtButton,
    xButton
  }
}
</script>

<style lang="scss">
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

page {
  background-color: #f8f5c3;
  background: #f8f5c3 url('../../assets/img/bg.png') no-repeat center bottom / cover;
  // background-color: #000;
}

.glitch{
  color:white;
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
.rabbit-img-big {
  position: absolute;
  width: 30%;
  left: 40rpx;
  bottom: 30rpx;
  // transform: rotateY(180deg);
}
.slogan-img-big {
  position: absolute;
  width: 35%;
  right: 20rpx;
  bottom: 30rpx;
}
.home-wrapper {
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
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
  .title-img {
    // position: absolute;
    // width: 60%;
    // right: 0;
    // top: 20rpx;
    margin: 0 0 30rpx;
    width: 66%;
  }
  .m-screen {
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
    position: relative;
    @extend %centerblock;
    display: flex;
    width: 90vw;
    height: 400rpx;
    height: 300rpx;
    align-items: center;
  }
  // background-color: #000;
  .a-round {
    position: absolute;
    margin-left: -150rpx;
    left: 0;
    opacity: 0.8;
    bottom: -150px;
    width: 300rpx;
    height: 300rpx;
    border-radius: 50%;
    background-color: #e9877b;
  }
}
</style>
