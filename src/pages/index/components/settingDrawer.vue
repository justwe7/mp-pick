<template>
  <AtDrawer
    :show="modelValue"
    width="90vw"
    mask
    :onClose="onClose"
    :items="data"
  ></AtDrawer>
</template>
<script type="text/ecmascript-6">
import { AtButton, AtDrawer } from 'taro-ui-vue'

export default {
  components: {
    AtButton,
    AtDrawer
  },
  props: {
    modelValue: {},
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  },
  data () {
    return {}
  },
  created () {},
  mounted () {},
  computed: {},
  methods: {
    onClose () {
      this.$emit('update:modelValue', false)
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">

</style>
