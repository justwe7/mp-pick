import { createApp } from 'vue'
import store from './store'
// import xButton from './components/x-button.vue'

import './app.scss'

const App = createApp({
  onShow (options) {},
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
})

// App.component('x-button', xButton)

App.use(store)


function isObj (data) {
  return Object.prototype.toString.call(data) === '[object Object]'
}

const promisify = (fnName, options = {}) => {
  return new Promise((resolve, reject) => {
    options.success = resolve
    options.fail = err => {
      reject(err)
    }
    wx[fnName](options)
  })
}

App.config.globalProperties.$promisify = promisify

App.config.globalProperties.$location = {
  to (data) { // 页面跳转
    if (isObj(data)) {
      return wx.navigateTo(data)
    }
    return promisify('navigateTo', { url: data })
  },
  replace (data) { // 重定向
    if (isObj(data)) {
      return wx.redirectTo(data)
    }
    return promisify('redirectTo', { url: data })
  },
  back (data = 1) { // 页面回退
    if (isObj(data)) {
      return wx.navigateBack({ delta: data })
    }
    return wx.navigateBack(data)
  }
}

export default App
