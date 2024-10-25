export const Host = 'https://xxxxxx/api'
//export const Host='http://localhost'
export const appid = 'appid'

export const navPages = ['home', 'xx', 'xxx', 'xx', 'xx']

export const tabBar = [
  {
    name: 'home',
    title: '首页',
    icon: 'home'
  },
  {
    name: 'wifi',
    title: 'WiFi',
    icon: 'wifi'
  },
  {
    name: 'usercenter',
    title: '个人中心',
    icon: 'user-vip'
  }
]

export const loadingText = '加载中...'

export const loginOutConfirm = async (response) => {
  return response.data.message === 'loginOut' && !response.data.success
}

export const shareAppMessage = {
  title: '',
  path: '',
  imageUrl: '',
}
export const shareAppMessage2 = {
    title: '',
    path: '',
    imageUrl: '',
  };

export const ADConfig = {
  defaultId:'',
  adUnitIds:{},
  interstitialAdId:''
}
