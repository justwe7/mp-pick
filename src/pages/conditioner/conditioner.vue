<template>
  <view class="xxx">
    <button @tap="handleOnOff">开关</button>
    <button @tap="handleHot">热风</button>
    <button @tap="handleCold">冷风</button>
    <!-- <button @tap="foo">播放</button> -->
  </view>
</template>
<script type="text/ecmascript-6">
  const AUDIO_COLD = 'cloud://local-4gnqjrqm20b167de.6c6f-local-4gnqjrqm20b167de-1306180639/conditioner/ac-work.mp3'
  const AUDIO_HOT = 'cloud://local-4gnqjrqm20b167de.6c6f-local-4gnqjrqm20b167de-1306180639/conditioner/air-extractor-fan.mp3'
  const AUDIO_ON = 'cloud://local-4gnqjrqm20b167de.6c6f-local-4gnqjrqm20b167de-1306180639/conditioner/di.mp3'

  import AudioVoise from './audio'

  // const oAudio = new Audio
  // const oAudio = AudioVoise()
  const oAudio = wx.createInnerAudioContext()

console.log(oAudio)
  let audioContext
  export default {
    components: {},
    setup () {
      return {}
    },
    created() {
      audioContext = wx.createInnerAudioContext()
      oAudio.onEnded(res => {
        console.log(res)
      })
      oAudio.src = AUDIO_HOT

      // audioContext.offStop(res => {
      //   console.log(res)
      // })
    },
    onMounted() {
      // audioContext = wx.createInnerAudioContext()
    },
    computed: {},
    methods: {
      handleOnOff () {
        // audioContext = wx.createInnerAudioContext()
        // audioContext.src = 'cloud://local-4gnqjrqm20b167de.6c6f-local-4gnqjrqm20b167de-1306180639/conditioner/ac-work.mp3'
        // audioContext.src = 'cloud://local-4gnqjrqm20b167de.6c6f-local-4gnqjrqm20b167de-1306180639/conditioner/air-extractor-fan.mp3'
        audioContext.src = AUDIO_ON
        audioContext.play()
      },
      handleHot () {
        oAudio.foo = 88
        console.log(222)
        oAudio.play()
      },
      handleCold () {
        audioContext.src = AUDIO_COLD
        audioContext.play()
      }
    }
  }
</script>
<style lang="scss" rel="stylesheet/scss">
page {
  background-color: #fff;
}
.xxx {
  color: #000;
}
</style>
