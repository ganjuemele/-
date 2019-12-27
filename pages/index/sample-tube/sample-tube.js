var sampleTube_ET = require('../../data/sampleTube-data.js')
var sampleTube_UT = require('../../data/sampleTube-data.js')

Page({
  data: {
    sampleTubeListData: [],
    searchList: [],
    size: '',
    info: '',
    remark: '',
    isSearch: false,
    radio_value: ''
  },
  //清除输入框
  onCancelImgTap: function (event) {
    this.setData({
      containerShow: true,
      searchPanelShow: false,
      searchResult: {},
      keyWord: ''
    })
  },

  onBindFocus: function (event) {
    this.setData({
      containerShow: false,
      searchPanelShow: true
    })
  },
  onBindChange: function (event) {
    //搜索框的输入变量
    var text = event.detail.value;
    var searchList = [];
    for (var i=0; i < this.data.sampleTubeListData.length; i++) {
      var waijing= this.data.sampleTubeListData[i].size.split('×')[0];
      //钢管规格
      var tubeSize = this.data.sampleTubeListData[i];
      if(text == waijing){
        searchList[i] = tubeSize;
      }
    }
      this.setData({
        searchList: searchList.reverse(),
        isSearch: true
      })
  },
  onRadioChange: function(event) {
    var radio_value = event.detail.value;
    if(radio_value == 'UT'){
      this.setData({
        radio_value: radio_value
      })
    } else if (radio_value == 'ET') {
      this.setData({
        radio_value: radio_value
      })
    }
    let that = this;
    let sampleTubeListData = [];
    let obj = {};
    if (this.data.radio_value == 'UT') {
      var tubeList = sampleTube_UT.tubeListUT;
    } else if (this.data.radio_value == 'ET') {
      var tubeList = sampleTube_ET.tubeListET;
    }
    for (var i = 0; i < tubeList.length; i++) {
      obj = {
        info: tubeList[i].info,
        size: tubeList[i].size,
        remark: tubeList[i].remark
      }
      sampleTubeListData[i] = obj;
    }
    that.setData({
      sampleTubeListData: sampleTubeListData
    })
    // console.log(tubeList.length)
  }
})