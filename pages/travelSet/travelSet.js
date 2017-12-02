const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({
  data: {
  
  },
  onLoad: function (options) {
    this.setData({
      lu_id: options.lu_id
    })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // // 添加分类
    // wx.request({
    //   url: apiurl + "luggage/append-category?sign=" + sign + '&operator_id=' + app.data.kid,
    //   data:{
    //     name: that.data.name,
    //   },
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   method: "POST",
    //   success: function (res) {
    //     console.log("添加分类", res);
    //     let status = res.data.status;
    //     if (status == 1) {
    //       console.log(1);
    //       tips.success('添加成功！');
    //       setTimeout(function(){
    //         wx.navigateBack({})
    //       },1000)
    //     } else {
    //       tips.alert(res.data.msg);
    //     }
    //   }
    // })
  },
  //事件处理
  del(){
    wx.navigateBack({})
  },
  save(){

  },
  // 分类
  themeInput(){
    console.log()
    wx.navigateTo({
      url: '../theme/theme?lu_id=' + this.data.lu_id + '&=cat_id' + this.data.cat_id
    })
  }
})