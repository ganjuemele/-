const app = getApp();
var staff = require('../data/staff.js');

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    nickName: '',
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    staffs: ['么了', "卓见.🐾", "东东锵", '刘朱伟', '陆怡', '王伟忠cium', '陈膺', '礼拜四', '小民', '霄霄']
  },

  onLoad () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true,
        nickName: app.globalData.userInfo.nickName
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        // console.log(res.userInfo)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          nickName: app.globalData.userInfo.nickName
        })
      }
    } else {
      // 在没有 open-type = getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            nickName: app.globalData.userInfo.nickName
          })
        }
      })
    }
  },
  yangguan() {
    var person = staff.personList;
    var hasPerson = 0;
    if (app.globalData.userInfo == null){
      wx.showLoading({
          title: '请先获取权限',
        })
        setTimeout(function () {
          wx.hideLoading();
        }, 3500)
    } else {
      person.forEach(x => {
        if (x.nickName == app.globalData.userInfo.nickName) {
          hasPerson = 1;
          return console.log(hasPerson);
        }
      })
    }
    if (hasPerson == 1) {
      wx.navigateTo({
        url: './sample-tube/sample-tube'
      })
    } else {
      wx.showLoading({
        title: '请先获取权限',
      })
      setTimeout(function () {
        wx.hideLoading();
      }, 3500)
    }
  },
  rili () {
    wx.navigateTo({
      url: './fanban/fanban',
    })
  },
  tongji() {
    wx.navigateTo({
      url: '../view/view',
    })
  },
  tuici() {
    wx.navigateTo({
      url: './tuici/tuici',
    })
  }
})