const baseUrl = 'https://wx.littl.cn'

/**
 *
 * @param {*} url
 * @param {*} [{ config = {}, ...params }={}]
 * @returns config 配置接口的参数，包含 header, method, 或者自定义的一些属性
 * @returns params 为 config 字段之外rest的参数，作为接口请求的参数请求体 data
 */
const httpOpt = {
  post () {
    return request(...arguments, 'POST')
  },
  get () {
    return request(...arguments, 'GET')
  },
  cf () {
    return wx.cloud.callFunction(...arguments).then(res => {
      if (res.errMsg === 'cloud.callFunction:ok') {
        return res.result
      }
      wx.showToast({
        title: res.errMsg || '云服务异常',
        icon: 'none',
        duration: 1500
      })
      return Promise.reject(res)
    })
  }
}

function request (url, data, config = {}, method = 'POST') {
  let domain = baseUrl
  const { header = {}, toast = true } = config
  const globalData = wx._globalData

  domain.endsWith('/') && (domain = domain.substr(0, domain.length - 1))
  return new Promise((resolve, reject) => {
    wx.request({
      url: `${domain}${url}`,
      method,
      header: {
        'content-type': 'application/json',
        ...header
      },
      data,
      success (res) {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          toast && wx.showToast({
            title: '服务异常',
            icon: 'none',
            duration: 2000
          })
          reject(res)
        }
      },
      fail (err) {
        reject(err)
      }
    })
  })
}

export default httpOpt
