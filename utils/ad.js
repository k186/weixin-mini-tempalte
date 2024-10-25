import $Router from "./router";
import $Store from "./store";
import {ADConfig} from "../config";



export function destroyVideoAd () {
  // 开发者工具中，页面销毁，调用下面代码会报错，真机好像没报错，先不销毁了。
  // if (__wxConfig.platform === 'devtools') { return }
  // try {
  //   if (this.videoAd && !this.videoAd._destroyed) {
  //     this.videoAd.destroy()
  //   }
  // } catch (error) {
  //   console.log(error)
  // }
}

export function onShowVideoAd () {
  this.videoAd.show().catch(() => {
    this.videoAd.load()
      .then(() => this.videoAd.show())
      .catch(err => {
        log.error(err)
        wx.showToast({
          title: '视频加载失败, 请重试 ~',
          icon: 'none'
        })
      })
  })
}

export function initVideoAd (page, giveReward) {
  let adUnitId = ADConfig.defaultId
  if (ADConfig.adUnitIds[page]) {
    adUnitId = ADConfig.adUnitIds[page]
  }
  
  const that = this
  this.videoAd = wx.createRewardedVideoAd({adUnitId})
  this.videoAd.onLoad(() => {
    console.log('加载激励视频广告')
  })
  this.videoAd.onError(err => {
    that.setData({videoAdState: false})
  })
  this.videoAd.onClose(res => {
    const {isEnded} = res
    if (isEnded) {
      typeof giveReward === 'function' && giveReward()
    } else {
      wx.showToast({
        title: '提前关闭了视频，不满足条件哦~',
        icon: 'none',
        duration: 2000
      })
    }
  })
}


const showPageAdPage = ['home', 'usercenter', 'appointmentList', 'fyAppointmentList']

export const initPageAd = () => {
  // 若在开发者工具中无法预览广告，请切换开发者工具中的基础库版本
  // 在页面中定义插屏广告
  let interstitialAd = null
  
  // 在页面onLoad回调事件中创建插屏广告实例
  if (wx.createInterstitialAd) {
    interstitialAd = wx.createInterstitialAd({
      adUnitId: ADConfig.interstitialAdId
    })
    interstitialAd.onLoad(() => {
    })
    interstitialAd.onError((err) => {
      console.error('插屏广告加载失败', err)
    })
    interstitialAd.onClose(() => {
    })
  }
  
  // 在适合的场景显示插屏广告
  if (interstitialAd && showPageAdPage.includes($Router.getCurrentPageName())) {
    interstitialAd.show().catch((err) => {
      console.error('插屏广告显示失败', err)
    })
  }
}
