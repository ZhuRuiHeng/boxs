const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  onLoad: function (options) {
    console.log('options' , options)
    this.setData({
      lu_id: options.lu_id
    })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 行李箱详情
    wx.request({
      url: apiurl + "luggage/luggage-detail?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        lu_id: that.data.lu_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("行李箱详情：", res);
        let status = res.data.status;
        if (status == 1) {
          that.setData({
              luggageInform:res.data.data
          })
        } else {
          that.setData({
            luggageInform:false
          })
          //tips.alert(res.data.msg)
        }
      }
    })
  },
  // 事件处理
  addNew(e){
    wx.navigateTo({
      url: '../travelSet/travelSet?lu_id=' + this.data.lu_id
    })
  }

})