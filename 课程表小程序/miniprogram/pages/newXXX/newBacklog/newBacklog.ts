import { getNowDate,getNowFullTime,getNowTime} from '../../../utils/util';
import {Backlog,Reminder} from '../../../dataStructure/dataStructure';
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    backlog:{
      username:'',
      title: 'null' as string,
      content: '',
      createTime: '',
      reminderID: ''
    } as Backlog,
    reminder:{
      status: 0,
      eventTime: '',
      reminderTime: '',
      _id: '',
    }as Reminder,
    eventTime:getNowTime(),
    eventDate:getNowDate(),
    time: getNowTime(),
    reminderDate: getNowDate(),
    reminderOrNotArray: ["否", "是"],
  },
  bindReminderStatusChange: function (e: { detail: { value: any } }) {
    this.setData({
      'reminder.status': e.detail.value,
    })
  },
  bindReminderDateChange: function (e: { detail: { value: any } }) {
    this.setData({
      reminderDate: e.detail.value
    })
  },
  bindReminderTimeChange(e: { detail: { value: any; }; }){
    this.setData({ time: e.detail.value });
  },
  bindEventDateChange: function (e: { detail: { value: any } }) {
    this.setData({
      eventDate: e.detail.value
    })
  },
  bindEventTimeChange: function (e: { detail: { value: any } }) {
    this.setData({
      eventTime: e.detail.value
    })
  },
  inputForm(data: { detail: { value: { title: string } } }) {
    var that=this
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
    this.setData({
      'reminder.eventTime':this.data.eventDate+" "+this.data.eventTime,
      'reminder.reminderTime':this.data.reminderDate+" "+this.data.time,
    })

    wx.request({
      url: "http://localhost:3000/api/reminder/new",
      data: this.data.reminder,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',
      success(res) {
        console.log(res)
        that.setData({
          reminder: res.data as Reminder,
        })
        that.setData({
          'backlog.username':app.globalData.usernameDisplay,
          'backlog.createTime':getNowFullTime(),
          'backlog.title': data.detail.value.title,
          'backlog.reminderID':that.data.reminder._id,
        })
        wx.request({
          url: "http://localhost:3000/api/backlog/new",
          data: that.data.backlog,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          responseType: 'text',
    
          success(res) {
            wx.hideLoading()
            console.log("添加成功")
            wx.navigateBack();
            return
          },
          fail() {
            wx.hideLoading()
            console.log("未能连上服务器数据库")
          }
        })
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    })
  },
  getContent(e: { detail: { value: string } }) {
    this.data.backlog.content=e.detail.value;
  },

  onLoad() {

  },
  onShow() {

  },
})