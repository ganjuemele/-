// var postsData = require('../data/post-data.js');
var util = require('../../utils/util.js');
Page({
  data: {
    toutiao: {},
    sport: {},
    caijing: {}
    // news_key: ''
  },
  onLoad: function (option) {
    var newsUrl = 'http://v.juhe.cn/toutiao/index' + '?key=4ac7dbb103ad3977c50735edb9651431' + '&type='+'tiyu';
    // var caijingNewsUrl = 'http://v.juhe.cn/toutiao/index' + '?key=4ac7dbb103ad3977c50735edb9651431' + '&type=' + 'caijing';
    // var toutiaoNewsUrl = 'http://v.juhe.cn/toutiao/index' + '?key=4ac7dbb103ad3977c50735edb9651431' + '&type=' + 'toutiao';

    this.getMovieListData(newsUrl, 'sport', "体育");
    // this.getMovieListData(caijingNewsUrl, 'caijing', "财经");
    // this.getMovieListData(toutiaoNewsUrl, 'toutiao', "头条");
    // console.log(this.data)
    
  },
  getMovieListData: function (url, settedKey, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      method: 'GET',
      header: {
        'Content-Type': "application/x-www-form-urlencoded"
      },
      dataType: 'json',
      success: function (res) {
        that.processDoubanData(res, settedKey, categoryTitle)
        console.log(res)
      },
      fail: function () {
        console.log(Error)
      }
    })
  },
  processDoubanData: function (news, settedKey, categoryTitle) {
    var movies = [];
    var tiyuNews = news.data.result
    for (var idx in tiyuNews.data) {
      var subject = tiyuNews.data[idx];
      var temp = {
        newsId: idx,
        title: subject.title,
        coverageUrl: subject.url,
        image: subject.thumbnail_pic_s,
        author: subject.author_name,
        date: subject.date
      }
      movies.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      news: movies
    };
    this.setData({
      readyData: readyData,
      news_key: readyData[settedKey].news
      });
    console.log(readyData[settedKey].news)
  },
  onNewsTap (event) {
    var newsId = event.currentTarget.dataset.newsid;
    var newsTapUrl = this.data.news_key[newsId].coverageUrl
    wx.navigateTo({
      url: newsTapUrl
    })
    console.log(newsTapUrl)
  },
})