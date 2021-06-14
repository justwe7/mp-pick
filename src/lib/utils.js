export default {
  toast (title, args) {
    wx.showToast({
      title,
      icon: 'none',
      ...args
    })
  },
  alert (content, args) {
    wx.showModal({
      title: '提示',
      content,
      ...args
    })
  }
}
