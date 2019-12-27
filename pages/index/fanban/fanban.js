Page({
  data: {
    year: 0,
    month: 0,
    date: ['日', '一', '二', '三', '四', '五', '六'],
    dateArr: [],
    banci1: '',
    banci2: '',
    banci3: '',
    banci4: '',
    initDay: 0,
    isToday: 0,
    isTodayWeek: false,
    todayIndex: 0,
    currentTime: Math.floor((new Date().getTime() / 3600000 + 8) / 24 - 18016),
    initBanci: ["甲: 休息,乙: 早班,丙: 夜班,丁: 休息", "甲: 早班,乙: 夜班,丙: 休息,丁: 休息", "甲: 夜班,乙: 休息,丙: 休息,丁: 早班", "甲: 休息,乙: 休息,丙: 早班,丁: 夜班"]
  },
  onLoad () {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    this.dateInit();
    // debugger;
    this.setData({
      year: year,
      month: month,
      isToday: '' + year + month + now.getDate()
    })
  },

  dateInit (setYear, setMonth) {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let dateArr = [];
    let arrLen = 0; 
    let now = setYear ? new Date(setYear, setMonth) : new Date();
    let year = setYear || now.getFullYear();
    let nextYear = 0;
    let month = setMonth || now.getMonth(); //没有index+1方便后面计算当月总天数
    let nextMonth = (month + 1) > 11 ? 1 : (month + 1);
    let startWeek = new Date(year + '/' + (month + 1) + '/' + 1).getDay(); //目标月1号对应的星期
    let dayNums = new Date(year, nextMonth, 0).getDate(); //目标月有多少天
    let obj = {};
    let num = 0;
    if (month + 1 > 11) {
      nextYear = year + 1;
      dayNums = new Date(nextYear, nextMonth, 0).getDate();
    }
    arrLen = startWeek + dayNums;
    for (let i = 0; i < arrLen; i++) {
        if (i >= startWeek) {
          num = i - startWeek + 1;
          obj = {
            isToday: '' + year + (month + 1) + num,
            dateNum: num,
            weight: 5
          }
        } else {
        obj = {};
      }
      dateArr[i] = obj;
      // console.log(dateArr);
    }
    this.setData({
      dateArr: dateArr
    })
    let nowDate = new Date();
    let nowYear = nowDate.getFullYear();
    let nowMonth = nowDate.getMonth() + 1;
    let nowWeek = nowDate.getDay();
    let getYear = setYear || nowYear;
    let getMonth = setMonth >= 0 ? (setMonth + 1) : nowMonth;
    if (nowYear == getYear && nowMonth == getMonth) {
      this.setData({
        isTodayWeek: true,
        todayIndex: nowWeek
      })
    } else {
      this.setData({
        isTodayWeek: false,
        todayIndex: -1
      })
    }
  },

  lookFanBan(event) {
    var targetYear = event.currentTarget.dataset.year;
    var targetMonth = event.currentTarget.dataset.month - 1;
    var targetDay = event.currentTarget.dataset.datenum;
    var initDay = (new Date(targetYear, targetMonth, targetDay).getTime() / 3600000 + 8) / 24 - 18016;
    let targetStartWeek = new Date(this.data.year + ',' + this.data.month + ',' + 1).getDay();
    var j = (initDay - 1) % 4;
    if (j == 1 | j == 2 | j == 3 | j == 0){
      var banci = this.data.initBanci[j].split(',');
    }else{
      return
    }
    this.setData({
      banci1: banci[0],
      banci2: banci[1],
      banci3: banci[2],
      banci4: banci[3]
    })
  },

  lastMonth() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month - 2 < 0 ? this.data.year - 1 : this.data.year;
    let month = this.data.month - 2 < 0 ? 11 : this.data.month - 2;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  },

  nextMonth() {
    //全部时间的月份都是按0~11基准，显示月份才+1
    let year = this.data.month > 11 ? this.data.year + 1 : this.data.year;
    let month = this.data.month > 11 ? 0 : this.data.month;
    this.setData({
      year: year,
      month: (month + 1)
    })
    this.dateInit(year, month);
  }
})