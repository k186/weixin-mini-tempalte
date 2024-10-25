class Http {
  constructor (baseURL, requestInterceptor, responseInterceptor, headers) {
    this.instance = {
      baseURL,
      headers: headers || {},
    };
    this.requestInterceptor = requestInterceptor;
    this.responseInterceptor = responseInterceptor;
  }
  
  async request (config) {
    if (this.requestInterceptor) {
      config = await this.requestInterceptor(config);
    }
    if (config.requestInterceptor) {
      config = await config.requestInterceptor(config);
    }
    return new Promise((resolve, reject) => {
      wx.request({
        timeout: 15000,
        url: this.instance.baseURL + config.url,
        method: config.method || 'GET',
        responseType: config.responseType || 'text',
        data: config.data || {},
        header: Object.assign({}, this.instance.headers, config.headers || {}),
        success: async (response) => {
          if (config.responseInterceptor) {
            await config.responseInterceptor(response, resolve, reject);
            return
          }
          if (this.responseInterceptor) {
            await this.responseInterceptor(response, resolve, reject);
            return
          }
          resolve(response);
        },
        fail: (error) => {
          resolve({success: false, message: '超时'})
        }
      });
    });
  }
  
  get (url = '', {data = {}, headers = {}, ...others} = {}) {
    return this.request(Object.assign({}, {url}, data, {headers, ...others}, {method: 'GET'}));
  }
  
  post (url = '', {data = {}, headers = {}, ...others} = {}) {
    return this.request(Object.assign({}, {url}, {headers, ...others}, {method: 'POST', data}));
  }
}

export default Http;
