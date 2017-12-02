const app = getApp()
const apiurl = 'https://friend-guess.playonwechat.com/';
let sign = wx.getStorageSync('sign');
import tips from '../../utils/tips.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mode:false,
    _cat_id:'' //当前选中的分类
  },
  onLoad: function (options) {
      this.setData({
        lu_id: options.lu_id,
        _cat_id: options.cat_id
      })
  },
  onShow: function () {
    let that = this;
    let sign = wx.getStorageSync('sign');
    // 分类列表
    wx.request({
      url: apiurl + "luggage/category-list?sign=" + sign + '&operator_id=' + app.data.kid,
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method: "POST",
      success: function (res) {
        console.log("分类列表", res);
        let status = res.data.status;
        if (status == 1) {
          that.setData({
            luggageList: res.data.data
          })
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  },
  nameInput(e){
    this.setData({
      name: e.detail.value
    })
  },
  setting(e){
    console.log("setting:",e);
    let name = e.currentTarget.dataset.name;
    let cat_id = e.currentTarget.dataset.cat_id;
    this.setData({
      mode:true,
      name: name,
      cat_id: cat_id
    })
  },
  cancel(){
    this.setData({
      mode: false,
      cat_id: '',
      name: ''
    })
  },
  addNew(){
    this.setData({
      mode: true
    })
  },
  // 删除
  delTheme(e){
    let that = this;
    let sign = wx.getStorageSync('sign');
    let cat_id = e.currentTarget.dataset.cat_id;
    // 删除分类
    wx.request({
      url: apiurl + "luggage/del-category?sign=" + sign + '&operator_id=' + app.data.kid,
      data: {
        cat_id: that.data.cat_id
      },
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success: function (res) {
        console.log("删除分类", res);
        let status = res.data.status;
        if (status == 1) {
          tips.success("删除成功！");
          // 分类列表
          wx.request({
            url: apiurl + "luggage/category-list?sign=" + sign + '&operator_id=' + app.data.kid,
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            method: "POST",
            success: function (res) {
              console.log("分类列表", res);
              let status = res.data.status;
              if (status == 1) {
                that.setData({
                  luggageList: res.data.data
                })
              } else {
                tips.alert(res.data.msg);
              }
            }
          })
          that.setData({
            mode: false
          })
        } else {
          tips.alert(res.data.msg);
        }
      }
    })
  },
  tapTheme(e){
    let _cat_id = e.currentTarget.dataset.cat_id;
    wx.setStorageSync('_cat_id', _cat_id); //从缓存拿当前的物品给travel
    this.setData({
      _cat_id
    })
    setTimeout(function(){
       wx.navigateBack({})
    },200)
  },
  save(){
    let that = this;
    let sign = wx.getStorageSync('sign');
    if (!that.data.name) {
      tips.alert("请输入类别名称");
      return false;
    }
    // 编辑分类
    if (that.data.cat_id){
      wx.request({
        url: apiurl + "luggage/edit-category?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          name: that.data.name,
          cat_id: that.data.cat_id
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log("编辑分类", res);
          let status = res.data.status;
          if (status == 1) {
            tips.success("编辑成功！");
            that.setData({
              cat_id:'',
              name:''
            })
            // 分类列表
            wx.request({
              url: apiurl + "luggage/category-list?sign=" + sign + '&operator_id=' + app.data.kid,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log("分类列表", res);
                let status = res.data.status;
                if (status == 1) {
                  that.setData({
                    luggageList: res.data.data
                  })
                } else {
                  tips.alert(res.data.msg);
                }
              }
            })
            that.setData({
              mode: false
            })
          } else {
            tips.alert(res.data.msg);
          }
        }
      })
    }else{
      // 添加分类
      wx.request({
        url: apiurl + "luggage/append-category?sign=" + sign + '&operator_id=' + app.data.kid,
        data: {
          name: that.data.name
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method: "POST",
        success: function (res) {
          console.log("添加分类", res);
          let status = res.data.status;
          if (status == 1) {
            tips.success("新增成功！");
            // 分类列表
            wx.request({
              url: apiurl + "luggage/category-list?sign=" + sign + '&operator_id=' + app.data.kid,
              header: {
                "Content-Type": "application/x-www-form-urlencoded"
              },
              method: "POST",
              success: function (res) {
                console.log("分类列表", res);
                let status = res.data.status;
                if (status == 1) {
                  that.setData({
                    luggageList: res.data.data
                  })
                } else {
                  tips.alert(res.data.msg);
                }
              }
            })
            that.setData({
              mode: false
            })
          } else {
            tips.alert(res.data.msg);
          }
        }
      })
    }
  }
})