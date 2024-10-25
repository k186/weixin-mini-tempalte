import {$} from "../../utils/tools";
import $Store from "../../utils/store";
import $Router from "../../utils/router";
import $User from "../../model/user";
import {initVideoAd, onShowVideoAd} from "../../utils/ad";


let location = [];
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    title: '晴天钟',
  },
  onReady(){
    initVideoAd.call(this, 'home', this.pickLocation.bind(this))
  },
  pickLocation () {
  
  },

})
