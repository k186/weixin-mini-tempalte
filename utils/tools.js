import dayjs from "dayjs";
import localizedFormat from 'dayjs/plugin/localizedFormat';
import zhCn from 'dayjs/locale/zh-cn';
import $Store from "./store";

dayjs.locale(zhCn)
dayjs.extend(localizedFormat);

export const isObject = (variable) => {
  return typeof variable === 'object' && variable !== null;
};

function getPageComponent (id) {
  const page = getCurrentPages()
  return page[page.length - 1].selectComponent(`#${id}`)
}

export const $ = {
  loading: ({text = '加载中...', mask = true, duration = 1500}) => {
    const loading = getPageComponent('loading');
    
    if (loading) {
      loading.show({text, mask, duration});
    }
  },
  Message: ({text, type = 'success'}) => {
    const message = getPageComponent('message');
    if (message) {
      message.show(text, type)
    }
  },
  ArrayBufferToImage: (buffer) => {
    const that = this;
    return new Promise((resolve, reject) => {
      const fileSystemManager = wx.getFileSystemManager();
      // 将二进制数据保存为本地临时文件
      const filePath = `${wx.env.USER_DATA_PATH}/temp-image.png`; // 根据文件类型设定合适的扩展名
      fileSystemManager.writeFile({
        filePath,
        data: buffer,
        encoding: 'binary',
        success () {
          resolve(filePath);
        },
        fail (err) {
          that.Message({text: '图片保存失败', type: 'error'});
          resolve(false);
        }
      });
    });
  },
  previewImage: (url) => {
    wx.previewImage({
      current: url, // 当前显示图片的http链接
      urls: [url] // 需要预览的图片http链接列表
    })
  },
  saveImage (url) {
    let that = this;
    wx.saveImageToPhotosAlbum({
      filePath: url, // 选择的图片路径
      success: function () {
        that.Message({text: '保存成功', type: 'success'});
      },
      fail: function (err) {
        that.Message({text: '保存失败', type: 'error'});
      }
    });
  },
  wxLogin () {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          resolve(res.code)
        },
        fail: (err) => {
          debugger
          resolve(null)
        }
      })
    })
  },
  setTitle (title) {
    const navbar = getPageComponent('navbar');
    if (navbar) {
      navbar.setTitle(title)
    }
  },
  dayjs,
  getTimeIsInRange (timeRanges) {
    const currentTime = dayjs();
    let currentString = currentTime.format('YYYY-MM-DD')
    const format = 'YYYY-MM-DD HH:mm:ss';
    
    let nearestStartDifference = Infinity; // 用于记录距离最近的开始时间的时间差
    let isInRange = false;
    let countdown = '';
    for (const range of timeRanges) {
      const [startTime, endTime] = range.split('-');
      const startMoment = dayjs(`${currentString} ${startTime}`, format);
      const endMoment = dayjs(`${currentString} ${endTime}`, format);
      
      
      // 如果小于开始时间则取 距离开始时间的时间差
      if (currentTime.isBefore(startMoment)) {
        isInRange = false
        const startDifference = startMoment.diff(currentTime, 'seconds');
        if (startDifference < nearestStartDifference) {
          nearestStartDifference = startDifference;
        }
        break
        // 大于开始时间小于结束时间
      } else if (currentTime.isAfter(startMoment) && currentTime.isBefore(endMoment)) {
        isInRange = true
        const endDifference = endMoment.diff(currentTime, 'seconds');
        const hours = Math.floor(endDifference / 3600);
        const minutes = Math.floor((endDifference % 3600) / 60);
        const seconds = endDifference % 60;
        
        const formatNumber = (num) => String(num).padStart(2, '0');
        
        countdown = `距离结束还有：${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
        
        break;
        // 大于结束时间
      } else if (currentTime.isAfter(endMoment)) {
        isInRange = false;
      }
    }
    
    if (!isInRange) {
      // 如果不在任何范围内，计算距离最近开始时间的时间差作为倒计时
      if (nearestStartDifference < 0) {
        nearestStartDifference = Math.abs(nearestStartDifference)
      }
      const hoursStart = Math.floor(nearestStartDifference / 3600);
      const minutesStart = Math.floor((nearestStartDifference % 3600) / 60);
      const secondsStart = nearestStartDifference % 60;
      
      const formatNumber = (num) => String(num).padStart(2, '0');
      countdown = '距离开始还有：' + `${formatNumber(hoursStart)}:${formatNumber(minutesStart)}:${formatNumber(secondsStart)}`;
      
      if (currentTime.isAfter(dayjs(`${currentString} ${timeRanges[timeRanges.length - 1].split('-')[1]}`, format))) {
        countdown = '明天起早~';
      }
    }
    
    return {
      isInRange,
      countdown,
    };
  }
}
