<<<<<<< HEAD
import { getNowDate,getNowFullTime,getNowTime} from '../../../utils/util';
import {Backlog,Reminder} from '../../../dataStructure/dataStructure';
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
<<<<<<< HEAD
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
=======
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
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    })
  },
  bindReminderDateChange: function (e: { detail: { value: any } }) {
    this.setData({
      reminderDate: e.detail.value
    })
  },
<<<<<<< HEAD
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
=======

  inputForm(data: { detail: { value: { title: string } } }) {
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    if (data.detail.value.title == 'null') {
      wx.showToast({
        title: '标题为空',
        icon: 'error',
        duration: 1000
      })
      return
    }
<<<<<<< HEAD
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
=======

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
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',
<<<<<<< HEAD
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
=======

      success(res) {
        wx.hideLoading()
        console.log("添加成功")
        console.log(res)
        wx.navigateBack();
        return
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    })
  },
<<<<<<< HEAD
  getContent(e: { detail: { value: string } }) {
    this.data.backlog.content=e.detail.value;
=======

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
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  },

  onLoad() {

  },
  onShow() {

  },
})