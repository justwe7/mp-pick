// const homeIcon = require('./assets/home.png')

export default {
  pages: [
    'pages/index/index',
    'pages/user/user',
    'pages/conditioner/conditioner'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#f8f5c3',
    navigationBarTitleText: '',
    navigationBarTextStyle: 'black'
  }/* ,
  tabBar: {
    list: [{
      // 'iconPath': homeIcon,
      'iconPath': 'assets/home.png',
      'selectedIconPath': 'assets/home_HL.png',
      pagePath: 'pages/index/index',
      text: '摇一摇'
    }, {
      'iconPath': 'assets/user.png',
      'selectedIconPath': 'assets/user_HL.png',
      pagePath: 'pages/user/user',
      text: '我的'
    }],
    'color': '#bfbfbf',
    'selectedColor': '#fb9300',
    'backgroundColor': '#fff',
    'borderStyle': 'white'
  } */,
  permission: {
    'scope.userLocation': {
      'desc': '你的位置信息将用于小程序服务搜索附近的美食'
    }
  }
}
