<template>
  <view class="user-home">
    <AtCard
      note=''
      extra='点选自动添加'
      title='可选'
      thumb='https://image.littl.cn/images/2021/06/12/09a5bc8fe849d5f4815a5d8e011d06f0.png'
    >
      <!-- 这也是内容区 可以随意定义功能 -->
      <!-- {{ list }} -->
      <AtTabs
        :current="current"
        scroll
        height='300rpx'
        tabDirection='vertical'
        :tabList="[
          { title: '查看全部' },
          { title: '简餐便当' },
          { title: '饮茶先啦' },
          { title: '汉堡披萨' }
        ]"
        :onClick="handleChangeType">
        <AtTabsPane tabDirection='vertical' :current="current" :index="0">
          <view class="m-options-box" style='font-size:22rpx;height: 300rpx;'>
            <view class="option-item" v-for="(item, index) in [...menusList[0], ...menusList[1], ...menusList[2]]" @tap="handleAddItem(item)">
              {{item}}
            </view>
          </view>
          <!-- <view style='font-size:18px;text-align:center;height:200px;'>标签页一的内容</view> -->
        </AtTabsPane>
        <AtTabsPane tabDirection='vertical' :current="current" :index="1">
          <view class="m-options-box" style='font-size:22rpx;height: 300rpx;'>
            <view class="option-item" v-for="(item, index) in menusList[0]" @tap="handleAddItem(item)">
              {{item}}
            </view>
          </view>
        </AtTabsPane>
        <AtTabsPane tabDirection='vertical' :current="current" :index="2">
          <view class="m-options-box" style='font-size:22rpx;height: 300rpx;'>
            <view class="option-item" v-for="(item, index) in menusList[1]" @tap="handleAddItem(item)">
              {{item}}
            </view>
          </view>
        </AtTabsPane>
        <AtTabsPane tabDirection='vertical' :current="current" :index="2">
          <view class="m-options-box" style='font-size:22rpx;height: 300rpx;'>
            <view class="option-item" v-for="(item, index) in menusList[2]" @tap="handleAddItem(item)">
              {{item}}
            </view>
          </view>
        </AtTabsPane>
      </AtTabs>
      <!-- <view class="f-hr"></view>
      <view class="g-title">已选项：</view>
      <view class="g-result-box">
        <view class="m-item" v-for="(item, index) in list">
          {{item}} <view class='at-icon at-icon-close'></view>
        </view>
      </view>
      <view class="g-btn-area">
        <AtButton type="secondary" size="small" @tap="updateList">手写</AtButton>
        <AtButton type="primary" size="small" @tap="updateList">保存</AtButton>
      </view> -->
    </AtCard>
    <AtCard
      note='编辑完成记得保存哦~~~'
      extra=''
      class="card-wrapper"
      title='已选'
      thumb='https://image.littl.cn/images/2021/06/12/09a5bc8fe849d5f4815a5d8e011d06f0.png'
    >
      <!-- <view class="f-hr"></view> -->
      <!-- <view class="g-title">已选项：</view> -->
      <view class="g-result-box">
        <view class="m-item" v-for="(item, index) in optionList" @tap="handleDelIdx(index)">
          {{item}} <view class='at-icon at-icon-close'></view>
        </view>
      </view>
      <view class="g-btn-area">
        <AtButton type="secondary" size="small" @tap="handleEdit">手写</AtButton>
        <AtButton type="primary" size="small" @tap="handleSave">保存</AtButton>
      </view>
    </AtCard>


    <AtFloatLayout
      :isOpened="isEdit"
      title="手动编辑(以空格分割选项)"
      :onClose="() => { isEdit = false }">
      <AtTextarea :onConfirm="handleEditSubmit" showConfirmBar :value="listByStr" :onChange="(e) => { listByStr = e }" :maxLength="9999" :count="false" placeholder="填写选项以空格分割"></AtTextarea>
      <AtButton type="primary" size="small" @tap="handleEditSubmit" class="f-mt-30">确定</AtButton>
    </AtFloatLayout>

    <AtToast :isOpened="isToast" :text="errMsg" :onClose="() => { isToast = false }"></AtToast>
  </view>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'
import { AtButton, AtCard, AtIcon, AtTabs, AtTabsPane, AtFloatLayout, AtTextarea, AtToast } from 'taro-ui-vue'

export default {
  name: 'User',
  setup () {
    const store = useStore()
    const optionList = ref(store.getters.randomList)

    function updateList(val) {
      optionList.value = val
    }

    function updateStore(val) {
      store.dispatch('updateList', val)
    }

    return {
      optionList,
      updateList,
      updateStore
    }
  },
  components: {
    AtButton,
    AtCard,
    AtIcon,
    AtTabs,
    AtTabsPane,
    AtFloatLayout,
    AtTextarea,
    AtToast
  },
  data () {
    return {
      isToast: false,
      errMsg: '失败',
      isEdit: false,
      current: 0,
      listByStr: '',
      menusList: [ // 选项列表
        [
          '凉皮肉夹馍',
          '米线',
          '重庆小面',
          '盖饭',
          '蛋炒饭',
          '刀削面',
          '羊杂汤',
          '卤煮',
          '羊肉泡馍',
          '砂锅',
          '养生粥',
          '兰州拉面',
          '油泼面'
        ],
        [
          '蜜雪冰城',
          '喜茶',
          'COCO',
          '奈雪',
          '一点点',
          '贡茶',
          '立顿',
          '香飘飘',
          '优乐美',
          '快乐水',
          '星巴克',
          '瑞星',
          'Costa'
        ],
        [
          '麦当劳',
          '肯德基',
          '赛百味',
          '汉堡王',
          '好伦哥',
          '华莱士',
          '必胜客',
          '达美乐',
          '德克士'
        ],
      ]
    }
  },
  methods: {
    toast (text) {
      this.isToast = true
      this.errMsg = text
    },
    handleDelIdx (e) {
      this.optionList.splice(e, 1)
    },
    handleChangeType (idx) {
      this.current = idx
    },
    handleAddItem (item) {
      console.log(item)
      if (this.optionList.includes(item)) {
        this.toast('已存在“' + item + '”')
        return false
      }
      console.log(this.optionList.includes(item))
      this.optionList.push(item)
    },
    handleEdit () {
      this.listByStr = this.optionList.join(' ')
      this.isEdit = true
    },
    handleEditSubmit (e) {
      this.optionList = this.listByStr.trim().split('\n').join(' ').split(' ').filter(v => v)
      // console.log(this.listByStr)
      this.updateList(this.optionList)
      this.isEdit = false
    },
    handleSave () {
      this.updateStore(this.optionList)
      this.$location.back()
    }
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

<style lang="scss" rel="stylesheet/scss">
@import "~taro-ui-vue/dist/style/components/card.scss";
@import "~taro-ui-vue/dist/style/components/tabs.scss";
@import "~taro-ui-vue/dist/style/components/float-layout.scss";
@import "~taro-ui-vue/dist/style/components/textarea.scss";
@import "~taro-ui-vue/dist/style/components/toast.scss";
@import "~taro-ui-vue/dist/style/components/icon.scss";

page {
  background-color: #fdfaf6;
}
.f-hr {
  height: 30rpx;
  @include border-1px-b(#bdc7c9, 100%, 0, 50%);
}
%flexcolumn {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.user-home {
  box-sizing: border-box;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-bottom: 50rpx;
  .m-options-box {
    height: 300rpx;
    .option-item {
      padding: 10rpx 0 10rpx 30rpx;
      @include border-1px-b(#bdc7c9, calc(100% - 30rpx), 30rpx);
    }
  }
  .card-wrapper {
    margin-top: 20rpx;
    @extend %flexcolumn;
    .at-card__content {
      @extend %flexcolumn;
      .at-card__content-info {
        @extend %flexcolumn;
      }
    }
  }
  .g-result-box {
    // display: flex;
    flex: 1;
    .m-item {
      color: #fff;
      font-size: 24rpx;
      margin: 0 8rpx 8rpx;
      display: inline-block;
      background-color: #f8a488;
      height: 36rpx;
      line-height: 36rpx;
      padding: 0 25rpx 0 10rpx;
      border-radius: 7rpx;
    }
  }
  .g-btn-area {
    padding-top: 30rpx;
    display: flex;
    justify-content: space-around;
    .at-button--small {
      padding-left: 50rpx;
      padding-right: 50rpx;
      margin: 0;
    }
  }
  .layout-header__title {
    font-size: 26rpx;
    color: #aaa;
  }
  .at-textarea__textarea {
    height: 300rpx;
  }
  .at-float-layout__container {
    top: 0;
    bottom: auto;
  }
}
</style>
