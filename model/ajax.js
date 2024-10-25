import Request from "../utils/request";
import $Store from "../utils/store";
import {$} from "../utils/tools";
import $Router from "../utils/router";
import {appid, Host, loginOutConfirm} from "../config";

const http = new Request(Host,
  async (config) => {
    
    let code = await $.wxLogin()
    config.headers = {
      ...config.headers,
      token: $Store.Storage.get('token'),
      code,
      appid: appid
    }
    return config;
  },
  async (response, resolve, reject) => {
    if (response.statusCode === 200) {
      if (await loginOutConfirm(response)) {
        $.Message({text: '登录失效，请重新登录', type: 'error'});
        $Store.clear;
        setTimeout(() => {
          $Router.navigateTo('home');
        }, 1500)
        return
      }
      resolve(response.data);
    } else {
      $.Message({text: '请求失败', type: 'error'});
      resolve({success: false, message: '请求失败'});
    }
  }
)

export default http;
