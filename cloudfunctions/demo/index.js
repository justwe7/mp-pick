// 云函数入口文件
const cloud = require('wx-server-sdk')
const got = require('got')
// const child_process = require('child_process');

cloud.init({
  //指定当前运行环境
  env: cloud.DYNAMIC_CURRENT_ENV
})
// 云函数入口函数

const getMeituanWeApp = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const { body } = await got.post('http://api.tbk.dingdanxia.com/waimai/meituan_privilege', {
        json: {"apikey":"Ibza4rjG5oKGOjnNIVr30f4XZM8KfA4l","sid":"123456","generate_we_app":"true"},
        responseType: 'json'
      });
      resolve(body.data)
    } catch (error) {
      resolve(null)
    }
  })
}



exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  const meituanRes = await getMeituanWeApp()

  return {
    event,
    meituan: meituanRes,
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
    unionid: wxContext.UNIONID,
  }
}
