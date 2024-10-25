const $Store = {
  get Storage () {
    return {
      get: (key) => {
        return wx.getStorageSync(key);
      },
      set: (key, value) => {
        wx.setStorageSync(key, value);
      }
    }
  },
  get clear () {
    wx.clearStorageSync();
  }
}
export default $Store
