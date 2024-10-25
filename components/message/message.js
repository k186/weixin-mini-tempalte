// components/Message/Message.js
import Message from 'tdesign-miniprogram/message/index';
Component({
  
  /**
   * 组件的属性列表
   */
  properties: {},
  
  /**
   * 组件的方法列表
   */
  methods: {
    show (text, type = 'error') {
      Message[type]({
        context: this,
        content: text,
        duration: 2000,
        offset:[65, 40]
      });
    }
  }
})
