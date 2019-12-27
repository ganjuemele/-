const app = getApp();
var staff = require('../data/staff.js');

Page({
  data: {
    motto: '💗感谢支持，谢谢使用!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo;
    // console.log('e.detail+ ', e.detail.userInfo);
    //获取授权信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  bindViewTap: function () {
    var person = staff.personList;
    var hasPerson = this.data.userInfo.nickName
    console.log('点击头像>>', hasPerson);
    person.forEach( item => {
      console.log('forEach:', 'item.nickName=', item.nickName, ' ，hasPerson=',hasPerson,'?',item.nickName == hasPerson)
    })
    // for(var i = 0; i <person.length; i++){
    //   console.log(person[i].nickName)
    // }
  },
  onShow: function (e) {
    const that = this;
    this.dtb = wx.cloud.database();
    this.dtb.collection("Users").get({
      success: res=> {
        // console.log('res+ ', res)
      }
    })
  }
})
