import {loadingText} from "../../config";

Component({
  
  /**
   * 组件的属性列表
   */
  properties: {},
  
  /**
   * 组件的初始数据
   */
  data: {
    text: loadingText,
    show: false,
    mask: true,
    size: '60rpx'
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    show ({text = loadingText, mask = true, duration = 1500}) {
      this.setData({
        show: true,
        text,
        mask
      });
      setTimeout(() => {
        this.hide();
      }, duration)
    },
    hide () {
      this.setData({
        show: false
      });
    }
  }
})
