// components/navbar/navbar.js
import $Router from "../../utils/router";
import {navPages} from "../../config";

Component({
  data: {
    isHome: false,
    title: ''
  },
  ready () {
    if (navPages.includes($Router.getCurrentPageName())) {
      this.setData({
        isHome: true
      })
    } else {
      this.setData({
        isHome: false
      })
    }
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    if (currentPage.data.title) {
      this.setData({
        title: currentPage.data.title
      })
    }
  },
  methods: {
    onBack () {
      $Router.navigateBack()
    },
    onGoHome () {
      $Router.relaunch('home')
    },
    setTitle (title = '') {
      this.setData({
        title
      })
    }
  }
})
