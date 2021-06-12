<template>
  <view class="home-wrapper">
    <!-- <view class="banner">
      <image src="../../assets/img/title.png" mode="widthFix" class="title-img"></image>
    </view> -->
    <view class="g-block-wrapper">
      <view class="m-screen">
        <image src="../../assets/img/title.png" mode="widthFix" class="title-img"></image>
        <view>{{ list[cur] }}</view>
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
    <AtButton type="primary" size="small" @click="handleClick"> {{ onOff ? '结束' : '开始' }}</AtButton>
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
        '五指山市',
        '琼海市',
        '文昌市',
        '万宁市',
        '东方市',
        '定安县',
        '屯昌县',
        '澄迈县',
        '临高县',
        '白沙黎族自治县',
        '昌江黎族自治县',
        '乐东黎族自治县',
        '陵水黎族自治县',
        '保亭黎族苗族自治县',
        '琼中黎族苗族自治县'
      ]
    }
  },
  mounted () {
    console.log(moduleName)
  },
  methods: {
    handleClick () {
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
      }, 100);
    },
    bar () {
      clearInterval(timer)
    }
  },
  components: {
    NumberDisplay,
    NumberSubmit,
    AtButton
  }
}
</script>

<style lang="scss">
$pink: #fd6e72;
$purple: #745260;
$teal: #abe7db;
$grey: #74919f;
$cream: #fdf9de;
$black: #333333;

$duration: 12s;
$total-kf: 15;
$tail-wags: 14;

$k-tail: (
  1: rotate(0),
  1.5: rotate(10deg),
  // 2: rotate(0),
  2.5: rotate(-5deg),
  3: rotate(30deg),
  4: rotate(-2deg),
  7: rotate(10deg),
  8: rotate(-5deg),
  8.5: rotate(10deg),
);

$k-left-whisker: (
  1: rotate(0),
  1.5: rotate(0deg),
  // 2: rotate(0),
  2.5: rotate(-5deg),
  3: rotate(0deg),
  4: rotate(0deg),
  7: rotate(10deg),
  8: rotate(-5deg),
  8.5: rotate(10deg),
);
$k-right-whisker: (
  1: rotate(180deg),
  1.5: rotate(190deg),
  // 2: rotate(0),
  2.5: rotate(180deg),
  3: rotate(175deg),
  4: rotate(190deg),
  7: rotate(180deg),
  8: rotate(185deg),
  8.5: rotate(175deg),
);

$k-body: (
  1: scaleY(1),
  1.5: scaleY(1.15),
  // 2: rotate(0),
  2.5: scaleY(1),
  3: scaleY(1.25),
  4: scaleY(1),
  7: scaleY(1.15),
  8: scaleY(1),
  8.5: scaleY(1.15),
);

$k-left-ear: (
  0: rotate(-20deg),
  1: rotate(-6deg),
  2: rotate(-15deg),
  4: rotate(-15deg),
  5: rotate(-30deg),
  6: rotate(-30deg),
  7: rotate(0deg),
  8: rotate(0deg),
  9: rotate(-15deg),
  12: rotate(-15deg),
  14: rotate(-6deg),
  $total-kf: rotateZ(-6deg)
);

$k-right-ear: (
  0: rotateZ(-16deg),
  1: rotateZ(-16deg),
  2: rotateZ(-19deg),
  4: rotateZ(-19deg),
  5: rotateZ(-30deg),

  5.5: rotateZ(-19deg),
  5.6: rotateZ(-30deg),
  5.7: rotateZ(-19deg),
  6: rotateZ(-19deg),
  6.1: rotateZ(-30deg),
  6.2: rotateZ(-19deg),

  7: rotateZ(-9deg),
  8: rotateZ(-9deg),

  9: rotateZ(-19deg),
  9.1: rotateZ(-30deg),
  9.2: rotateZ(-19deg),
  9.4: rotateZ(-19deg),
  9.5: rotateZ(-30deg),
  9.6: rotateZ(-19deg),

  12: rotateZ(-19deg),
  14: rotateZ(-16deg),
  $total-kf: rotateZ(-16deg)
);

$tail-interval: (11 - 7.5) / $tail-wags;

@mixin effect($name, $kf) {
  @keyframes #{$name} {
    @each $interval, $transform in $kf {
      #{percentage($interval/$total-kf)} {
        transform: $transform;
      }
    }
  }
}

@include effect('tail', $k-tail);
@include effect('body', $k-body);

@include effect('left-whisker', $k-left-whisker);
@include effect('right-whisker', $k-right-whisker);

@include effect('left-ear', $k-left-ear);
@include effect('right-ear', $k-right-ear);


body {
  background-color: $teal;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.main{
  height: 400px;
  width: 400px;
  // background-color: white;
  position: relative;

  .stand{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    height: 20px;
    width: 200px;
    border-radius: 20px;
    background-color: $pink;
    z-index: 2;
    &::after{
    content: "";
    position: absolute;
    bottom: -10px;
    left: 50%;
    transform: translate(-50%);
    height: 10px;
    width: 50px;
    border-radius: 20px;
    background-color: $cream;
    box-shadow:
      0 10px 0 $cream,
      0 20px 0 $cream,
      0 30px 0 $cream,
      0 40px 0 $cream,
      0 50px 0 $cream,
      0 60px 0 $cream,
      0 70px 0 $cream,
      0 80px 0 $cream,
      0 90px 0 $cream,
      0 100px 0 $cream,
      0 110px 0 $cream,
      0 120px 0 $cream,
      0 130px 0 $cream,
      0 140px 0 $cream,
      0 150px 0 $cream,
      0 160px 0 $cream,
      0 170px 0 $cream;
    }

  }
  .cat{
    width: 110px;
    height: 50px;
    position: absolute;
    top: calc(50% - 50px);
    right: 130px;
    border-top-left-radius: 50px * 2;
    border-top-right-radius: 50px * 2;
    // animation: body $duration none infinite;

    .body{
     width: 110px;
    height: 50px;
    background-color: $purple;
    position: absolute;
    // top: calc(50% - 50px);
    // left: 130px;
    border-top-left-radius: 50px * 2;
    border-top-right-radius: 50px * 2;
    animation: body $duration none infinite;
    }
    .head{
      content: "";
      width: 70px;
      height: 35px;
      background-color: $purple;
      position: absolute;
      top: calc(50% - 10px);
      left: -40px;
      border-top-left-radius: 40px * 2;
      border-top-right-radius: 40px * 2;
      // border-radius: 10px 10px 0 10px;
    }
  }

}

.tail-container{
  position: absolute;
  right: 0;
  bottom: -13px;
  z-index: 3;
}
.tail {
  position: absolute;
  height: 30px;
  width: 14px;
  bottom: -10px;
  right: 0;
  border-bottom-right-radius: 5px;
  background: $purple;
  z-index: 0;

  > .tail {
    animation: tail $duration none infinite;
    height: 100%;
    width: 14px;
    // bottom: -26%;
    transform-origin: left;
    border-bottom-left-radius: 20px 20px;
    border-bottom-right-radius: 20px 20px;
    border-top-right-radius: 40px;
    // transform: rotate(30deg);
  }
}
.ear{
  position: absolute;
  left: 4px;
  top: -4px;
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right:12px solid transparent;
  border-bottom:20px solid $purple;
  transform: rotate(-30deg);
  animation: left-ear $duration both infinite;

   + .ear {
     animation: right-ear $duration both infinite;
     top: -12px;
     left: 30px;
     // transform: rotate(-20deg);
  }
}
  .nose{
    position: absolute;
    bottom: 10px;
    left: -10px;
    background-color: $pink;
    height: 5px;
    width: 5px;
    border-radius: 50%;
}
  .whisker-container {
    position: absolute;
    bottom: 5px;
    left: -36px;
    width: 20px;
    height: 10px;
    transform-origin: right;
    animation: left-whisker $duration both infinite;

    &:nth-child(2) {
        left: -20px;
        bottom:12px;
        transform-origin: right;
        transform: rotate(180deg);
        animation: right-whisker $duration both infinite;


    }
}

.whisker {
    position: absolute;
    top: 0;
    width: 100%;
    border: 1px solid $cream;
    transform-origin: 100% 0;
    transform: rotate(10deg);

    &:last-child {
        top: 0;
        transform: rotate(-20deg);
    }
}
// colors
:root {
  --color-dark:  #161616;
  --color-ocean:  #416dea;
  --color-grass: #3dd28d;
  --color-snow: #FFFFFF;
  --color-salmon: #F32C52;
  --color-sun: #feee7d;
  --color-alge: #7999a9;
  --color-flower: #353866;
  --color-smoke: #e4e4e4;
  --borderRadius: 36px;
}

page {
  background-color: #f8f5c3;
  background: #f8f5c3 url('../../assets/img/bg.png') no-repeat center bottom / cover;
  // background-color: #000;
}
// button styles
.button {
  display: flex;
  overflow: hidden;

  margin: 10px;
  padding: 12px 12px;

  cursor: pointer;
  user-select: none;
  transition: all 150ms linear;
  text-align: center;
  white-space: nowrap;
  text-decoration: none !important;
  text-transform: none;
  text-transform: capitalize;

  color: #fff;
  border: 0 none;
  border-radius: var(--borderRadius);

  font-size: 13rpx;
  font-weight: 500;
  line-height: 1.3;

  justify-content: center;
  align-items: center;

  box-shadow: 2px 5px 10px var(--color-smoke);

  &:hover {
    transition: all 150ms linear;

    opacity: .85;
  }

  &:active {
    transition: all 150ms linear;
    opacity: .75;
  }

  &:focus {
    outline: 1px dotted #959595;
    outline-offset: -4px;
  }
}

.button.regular {
  color: #202129;
  background-color: #f2f2f2;

  &:hover {
    color: #202129;
    background-color: #e1e2e2;
    opacity: 1;
  }

  &:active {
    background-color: #d5d6d6;
    opacity: 1;
  }
}

.glitch{
  color:white;
  font-size: 48rpx;
  position: relative;
  width: 100vw;
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
  background:black;
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
.home-wrapper {
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
  .title-img {
    margin: 20rpx 0;
    width: 440rpx;
  }
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
  .m-screen {
    @extend %centerblock;
    width: 80vw;
    height: 200rpx;
    // background-color: #f3a5a5;
    border: 8rpx solid rgba($color: #221815, $alpha: 0.8);
    background-color: rgba($color: #f3a5a5, $alpha: 0.6);
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
