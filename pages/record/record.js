Page({
  data: {
    array: ['1#', '2#', '3#', '4#'],
    material: ["T91", "20G", "8617H", "Ck35-1", '20', 'R102', '27CD4', '210C', 'A-106B', '15CrMoG', '12Cr1MoVG', '34MnB5', '45B2M', '26MnB5'],
    materialIndex:0,
    index: 0,
    nian: (new Date).getFullYear().toString(),
    date: '',
  },
  onLoad: function () {
    var ri = (new Date).getDate().toString();
    var yue = ((new Date).getMonth() + 1).toString();
    if (ri < 10) {
      ri = 0 + ri;
    }
    if (yue < 10) {
      yue = 0 + yue;
    }
    this.setData({
      date: this.data.nian + '-' + yue + '-' + ri
    })
  },
  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  bindMaterialPickerChange:function(e){
    this.setData({
      materialIndex:e.detail.value
    })
  },

  formSubmit: function (e) {
    let that = this;
    let formData = e.detail.value;
    // console.log(formData);
    // var list_id = that.data.list_id + 1;
    // that.setData({
    //   list_id: list_id
    // })
    if (formData.date == null) {
      wx.showLoading({
        title: '请填写日期',
      })
      setTimeout(function () {
        wx.hideLoading()
      }, 4000)
    } else if (formData.date !== null){
      let nullValue = '';
      switch (nullValue) {
        case formData.contract_no:
          wx.showLoading({
            title: '请输入合同号 ',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 4000)
          break;
        case formData.diameter :
          wx.showLoading({
            title: '请输入直径 ',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 4000)
          break;
        case formData.thickness:
          wx.showLoading({
            title: '请输入壁厚 ',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 4000)
          break;
        case formData.length:
          wx.showLoading({
            title: '请输入长度 ',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 4000)
          break;
        case formData.diao_number:
          wx.showLoading({
            title: '请输入吊数',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 4000)
          break;
        case formData.zhi_number:
          wx.showLoading({
            title: '请输入支数',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 4000)
          break;
        default:
          this.setData({
            list_id: this.data.list_id++
          })
          wx.showLoading({
            title: '正在提交',
          })
          setTimeout(function () {
            wx.hideLoading()
          }, 2000)
          const db = wx.cloud.database();
          db.collection("WorkRecords").add({
            data: formData,
            success: function (res) {
              wx.showLoading({
                title: '提交成功',
              })
              setTimeout(function () {
                wx.hideLoading()
              }, 2000)
            }
          })
      }
    //   if (formData.diameter == ''){
    //     wx.showLoading({
    //       title: '请输入直径 ',
    //     })
    //     setTimeout(function () {
    //       wx.hideLoading()
    //     }, 4000)
    //   } else if (formData.diameter !== ''){
    //     if(formData.thickness == ''){
    //       wx.showLoading({
    //         title: '请输入壁厚',
    //       })
    //       setTimeout(function () {
    //         wx.hideLoading()
    //       }, 4000)
    //     } else if (formData.thickness !== ''){

    //       wx.showLoading({
    //         title: '正在提交',
    //       })
    //       setTimeout(function () {
    //         wx.hideLoading()
    //       }, 2000)
    //       const db = wx.cloud.database();
    //       db.collection("WorkRecords").add({
    //         data: formData,
    //         success: function (res) {
    //           wx.showLoading({
    //             title: '提交成功',
    //           })
    //           setTimeout(function () {
    //             wx.hideLoading()
    //           }, 2000)
    //         }
    //       })
    //     }
    //   }
    }
  }
})