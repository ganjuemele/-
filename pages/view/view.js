
Page({
  data: {
    listData: [],
    allType1: "", 
    allType2: "", 
    all_meter_number: "",
    all_cube_weight: '',
    isDateEqual: '',
    // delBtnWidth: 185, //删除按钮宽度单位（rpx）
    riqi: '',
    ri: '',
    nian: (new Date).getFullYear().toString(),
    yue: '',
    // del: false,
    // isRepeat: '',
  },
  onLoad: function () {
    var ri = (new Date).getDate().toString();
    var yue = ((new Date).getMonth() + 1).toString();
    if(ri < 10){
      ri = 0 + ri;
    }
    if(yue < 10){
      yue = 0 + yue;
    }
    this.setData({
      ri: ri,
      yue: yue,
      riqi: this.data.nian + '-' + yue + '-' + ri
    })
  },
  
  onShow: function () {
    var inputValue1 = 0, inputValue2 = 0, inputValue3 = 0, isRepeat ="";
    var meter_number, meterNumber, cube_weight, all_weight = 0;
    var newListData = [];
    const that = this;
    this.db = wx.cloud.database();
    this.db.collection("WorkRecords").get({
      success: function(res){
        // console.log(res)
        if(res.data.length){
        // console.log("---------res.data:" , res.data);
          let newList =  res.data.filter ( item =>{
            var rn = item.date == that.data.riqi;
            return rn;
          })
          that.data.listData = [...newList];
          // console.log("---------", newList, that.data.listData);
          that.data.listData.forEach(item => {
            // console.log('=', item.radio_group)
            item.specify = `${item.diameter}*${item.thickness}*${item.length}`;
            inputValue1 += parseInt(item.diao_number);
            inputValue2 += parseInt(item.zhi_number); 
            item.meter_number = (item.length * item.zhi_number).toFixed(2);
            // console.log(item.meter_number)
            inputValue3 += item.meter_number; 
            item.isRepeat = item.radio_group;
            item.cube_weight = (item.thickness * (item.diameter - item.thickness) * 0.02466 * item.length * item.zhi_number).toFixed(2)/1000;
            all_weight += parseInt((item.thickness * (item.diameter - item.thickness) * 0.02466 * item.length * item.zhi_number).toFixed(2) / 1000);
          })
          
          that.setData({
            allType1: inputValue1,
            allType2: inputValue2,
            all_meter_number: Math.round(inputValue3),
            all_cube_weight: all_weight,
            listData: that.data.listData,
            isDateEqual: 'true',
          })
        }
      }
    })
  },
  bindDateChange: function (e) {
    var date = e.detail.value;
    var inputValue1 = 0, inputValue2 = 0, inputValue3 = 0, isRepeat = '';
    var meter_number, meterNumber, cube_weight, all_weight = 0;
    const that = this;
    this.db.collection("WorkRecords").where({
      //指定筛选条件
      date: date
    }).get({
      success: function(res) {
        if (res.data.length) {
          let newList = res.data.filter(item => {
          return item.date == date;
        })
      that.data.listData = [...newList];
      that.data.listData.forEach(item => {
        item.specify = `${item.diameter}*${item.thickness}*${item.length}`;
        inputValue1 += parseInt(item.diao_number);
        inputValue2 += parseInt(item.zhi_number);
        item.meter_number = (item.length * item.zhi_number).toFixed(2);
        inputValue3 += parseInt(item.meter_number);
        item.isRepeat = item.radio_group;
        item.cube_weight = (item.thickness * (item.diameter - item.thickness) * 0.02466 * item.meter_number/1000).toFixed(2);
        all_weight += (item.cube_weight*100);
      })
        that.setData({
          allType1: inputValue1,
          allType2: inputValue2,
          all_meter_number: inputValue3,
          listData: res.data,
          riqi: date,
          isDateEqual: 'true',
          all_cube_weight: all_weight/100,
          // isRepeat: item.isRepeat,
        })
          // console.log('=',item.radio_group)
        }
      }
    })
  },
  // delRecord: function(e){
  //   let that = this;
  //   console.log(that.data.listData)
  //   if (that.data.del == ''){
  //     that.setData({
  //       del: true
  //     })
  //   } else{
  //     that.setData({
  //       del: false
  //     })
  //   }
  // },
  addRecord: function() {
    wx.navigateTo({
      url: '../record/record'
    })
  }
})