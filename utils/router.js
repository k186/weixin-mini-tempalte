import {$, isObject} from "./tools";

const getPagePath = (pageName, data) => {
  if (data && isObject(data)) {
    return `/pages/${pageName}/${pageName}?query=${encodeURIComponent(JSON.stringify(data))}`;
  }
  return `/pages/${pageName}/${pageName}`;
}


const $Router = {
  getCurrentPageName () {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    return currentPage.route.split('/')[2];
  },
  relaunch (pageName, data) {
    return new Promise((resolve) => {
      wx.reLaunch({
        url: getPagePath(pageName, data),
        complete: resolve,
        fail: (err) => {
          $.Message({text: '跳转页面失败', type: 'error'});
        }
      });
    });
  },
  redirectTo (pageName, data = null) {
    return new Promise((resolve) => {
      wx.redirectTo({
        url: getPagePath(pageName, data),
        complete: resolve,
      });
    });
  },
  navigateTo (pageName, data = null) {
    return new Promise((resolve) => {
      wx.navigateTo({
        url: getPagePath(pageName, data),
        complete: resolve,
      });
    });
  },
  navigateBack (delta = -1) {
    return new Promise((resolve) => {
      wx.navigateBack({
        delta,
        complete: resolve,
      });
    });
  },
};
export default $Router;
