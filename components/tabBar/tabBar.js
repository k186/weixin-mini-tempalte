// components/tabBar/tabBar.js
import $Router from "../../utils/router";
import $Store from "../../utils/store";
import $User from "../../model/user";
import {tabBar} from "../../config";

Component({
  
  /**
   * 组件的属性列表
   */
  properties: {},
  data: {
    active: 'home',
    routeList: [],
  },
  async ready () {
    const pageName = $Router.getCurrentPageName();
    // todo 这里要走动态路由 由服务端下发
    let routeList = tabBar
    this.setData({
      active: pageName,
      routeList
    })
  },
  methods: {
    onChange (event) {
      const pageName = event.detail.value
      $Router.redirectTo(pageName)
    }
  }
})
