const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'

Page({
  data: {
    page: 1,
    edit:false
  },
  onLoad: function () {
  },
  onShow: function () {
      let that = this;
      app.getAuth(function () {
        let userInfo = wx.getStorageSync('userInfo');
        let sign = wx.getStorageSync('sign');
        // 行李箱列表
         wx.request({
           url: apiurl + "luggage/luggage-list?sign=" + sign + '&operator_id=' + app.data.kid,
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("行李箱列表：",res);
              let status = res.data.status;
              if (status==1){
                    that.setData({
                      luggageList: res.data.data
                    })
              }else{  
                 that.setData({
                   air: true
                 })
                 console.log(res.data.msg);
              }
            }
          })
      })
  },
  //事件处理函数
  editTap() {
    this.setData({
      edit: !this.data.edit
    })
  },
  delNow(e){
    console.log(e);
    let that = this;
    let sign = wx.getStorageSync('sign');
    let index = e.currentTarget.dataset.index;
    let lu_id = e.currentTarget.dataset.lu_id;
    wx.showModal({
      content: "确认删除此行李箱",
      confirmText: "确定",
      cancelText: "取消",
      success: function (res) {
        if (res.confirm) { 
          wx.request({
            url: apiurl + "luggage/del-luggage?sign=" + sign + '&operator_id=' + app.data.kid,
            data: {
              lu_id: lu_id
            },
            header: {
              'content-type': 'application/json'
            },
            method: "GET",
            success: function (res) {
              console.log("删除商品", res);
              var status = res.data.status;
              if (status == 1) { //删除成功
                tips.success('删除商品成功');
                // 更新行李箱列表
                wx.request({
                  url: apiurl + "luggage/luggage-list?sign=" + sign + '&operator_id=' + app.data.kid,
                  header: {
                    'content-type': 'application/json'
                  },
                  method: "GET",
                  success: function (res) {
                    console.log("行李箱列表：", res);
                    let status = res.data.status;
                    if (status == 1) {
                      console.log(1);
                      that.setData({
                        luggageList: res.data.data
                      })
                    } else {
                      console.log(res.data.msg);
                    }
                  }
                })
              } else { //删除失败
                  tips.alert(tips.alert.msg);
                }
            }
          })
        } else { //取消删除
          console.log("取消删除!")
        }
      }
    })
  },
  setting: function (e) {
    let lu_id = e.currentTarget.dataset.lu_id;
    let name = e.currentTarget.dataset.name;
    let desc = e.currentTarget.dataset.name.desc;
    wx.navigateTo({
      url: '../seting/seting?lu_id=' + lu_id + '&name=' + name + '&desc=' + desc
    })
  },
  //详情
  travelInform(e){
    let lu_id = e.currentTarget.dataset.lu_id;
    wx.navigateTo({
      url: '../travel/travel?lu_id=' + lu_id 
    })
  },
  addNew() {
    wx.navigateTo({
      url: '../new/new'
    })
  }
 
  
})
