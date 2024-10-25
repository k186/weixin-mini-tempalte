import {$} from "./tools";
import $Store from "./store";
import {initPageAd} from "./ad";
import {shareAppMessage, shareAppMessage2} from "../config";

export const WxPage = (config) => {
  let {
    data,
    onLoad,
    onReady,
    onShow,
    onHide,
    onUnload,
    onPullDownRefresh,
    onReachBottom,
    onShareAppMessage,
    ...others
  } = config;
  return Page({
    /**
     * 页面的初始数据
     */
    data: {
      title: '',
      showPage: false,
      isRequesting: false,
      flatLoading: {loading: false},
      ...data
    },
    setTitle (title) {
      $.setTitle(title)
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad (options = {}) {
      initPageAd()
      if (options) {
        if (options.query) {
          options = JSON.parse(decodeURIComponent(options.query))
        }
        if (options.scene) {
          const scene = decodeURIComponent(options.scene)
          try {
            let oneArr = scene.split('-')
            let twoJson = {}
            for (let i = 0; i < oneArr.length; i++) {
              let target = oneArr[i].split(':')
              twoJson[target[0]] = target[1]
            }
            delete options.scene
            options.pure = twoJson;
            
          } catch (e) {
          
          }
        }
        if ($Store.Storage.get('token')) {
          this.setData({
            showPage: true
          })
        }
      }
      onLoad && onLoad.call(this, options)
    },
    
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady () {
      onReady && onReady.call(this)
    },
    /**
     * 生命周期函数--监听页面显示
     */
    onShow () {
      onShow && onShow.call(this)
    },
    
    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide () {
      onHide && onHide.call(this)
    },
    
    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload () {
      onUnload && onUnload.call(this)
    },
    
    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh () {
      onPullDownRefresh && onPullDownRefresh.call(this)
    },
    
    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom () {
      onReachBottom && onReachBottom.call(this)
    },
    
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage () {
      const login = $Store.Storage.get('token');
      if (login) {
        return shareAppMessage
        
      }
      return shareAppMessage2
    },
    onShareTimeline(){
      const login = $Store.Storage.get('token');
      if (login ) {
        return shareAppMessage
        
      }
      return shareAppMessage2
    },
    async requestStart (callback) {
      if (this.data.isRequesting) {
        $.Message({text: '正在请求中，请稍后', type: 'error'})
        return
      }
      this.setData({
        isRequesting: true,
        flatLoading: {
          loading: true
        }
      })
      if (callback) {
        await callback();
      }
      this.setData({
        isRequesting: false,
        flatLoading: {
          loading: false
        }
      })
    },
    ...others
  })
}
