var tuici1 = require('../../data/tuici_Parameter.js')
var tuici2 = require('../../data/tuici_Parameter.js')
Page({
  data: {
    tuiciList1: []
  },
  onLoad: function (options) {
    // console.log(tuici1.tuiciList1)
    var tuiciList1 = tuici1.tuiciList1;
    this.setData({
      tuiciList1: tuiciList1
    })
  }
})