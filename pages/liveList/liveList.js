const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bianji:false,
  },
  onLoad: function (options) {
      this.setData({
        lu_id: options.lu_id
      })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 收藏物品列表
    wx.request({
      url: apiurl + "luggage/collect-list?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        lu_id: that.data.lu_id,
      },
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log("收藏物品列表", res);
        let status = res.data.status;
        if (status == 1) {
          console.log(1);
          that.setData({
            luggageList: res.data.data
          })
        } else {
          that.setData({
            luggageList: false
          })
          //tips.alert(res.data.msg);
        }
      }
    })
  },
  bianji(){
    this.setData({
      bianji: !this.data.bianji
    })
  },
 
})