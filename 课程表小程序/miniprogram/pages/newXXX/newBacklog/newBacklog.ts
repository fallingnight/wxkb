var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: 'null' as string,
    content: '' as string,
    reminderOrNot: 0,
    reminderDate: String,
    reminderOrNotArray: ["否", "是"],
    shouldIRemind: false
  },
  bindReminderOrNotChange: function (e: { detail: { value: any } }) {
    this.setData({
      reminderOrNot: e.detail.value
    })
  },
  bindReminderDateChange: function (e: { detail: { value: any } }) {
    this.setData({
      reminderDate: e.detail.value
    })
  },

  inputForm(data: { detail: { value: { title: string } } }) {
    if (data.detail.value.title == 'null') {
      wx.showToast({
        title: '标题为空',
        icon: 'error',
        duration: 1000
      })
      return
    }

    wx.showLoading({
      title: "上传中"
    })
    wx.request({
      url: "http://localhost:3000/api/backlog/new",
      data: {
        "username": app.globalData.usernameDisplay,
        "createTime": this.getNowDate(),
        "title": data.detail.value.title,
        "content": this.data.content,
        "reminderOrNot": this.data.reminderOrNot,
        "reminderTime": this.data.reminderDate, // 这里一个是Time一个是Date
        "shouldIRemind": this.data.shouldIRemind
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success(res) {
        wx.hideLoading()
        console.log("添加成功")
        console.log(res)
        wx.navigateBack();
        return
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    })
  },

  getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var hours = myDate.getHours(); //获取当前小时
    var minutes = myDate.getMinutes(); //获取当前分钟
    var seconds = myDate.getSeconds(); //获取当前秒
    var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return now;
  },

  getContent(e: { detail: { value: string } }) {
    this.data.content=e.detail.value
  },

  onLoad() {

  },
  onShow() {

  },
})