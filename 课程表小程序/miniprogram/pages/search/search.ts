<<<<<<< HEAD
import { Course } from '../../dataStructure/dataStructure';
import { TimeData } from '../../miniprogram_npm/@vant/weapp/count-down/utils';
var app = getApp()
Page({
  data: {
    courseName: '',
    teacher:'',
    place:'',
    dayString:'',
    whichDayArray: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
  },
  courseNameInputAction: function (options: { detail: any }) {
    this.data.courseName = options.detail.value
  },
  placeInputAction: function (options: { detail: any }) {
    this.data.place = options.detail.value
  },
  dayInputAction: function (options: { detail: any }) {
    this.data.dayString = options.detail.value
  },
  teacherInputAction: function (options: { detail: any }) {
    this.data.teacher = options.detail.value
  },
  inputForm() {
    var that = this;
    var dayIndex=this.data.whichDayArray.indexOf(this.data.dayString)

    wx.showLoading({
      title: "搜索中"
    })
    wx.request({
      url: "http://localhost:3000/api/course/get-course",
      data: {
        "username": app.globalData.usernameDisplay,
        "courseName": that.data.courseName,
        "teacher":that.data.teacher,
        "place":that.data.place,
        "whichDay":dayIndex==-1?'':dayIndex
=======
import {Course} from '../../dataStructure/dataStructure';
var app = getApp()
Page({
  data: {
    courseName: '' as string
  },
  courseNameInputAction: function (options: { detail: any }) {
    this.data.courseName=options.detail.value
  },
  inputForm(){
    var that = this;
    wx.showLoading({
      title: "登录中"
    })
    wx.request({
      url: "http://localhost:3000/api/course/search",
      data: {
        "username": app.globalData.usernameDisplay,
        "courseName": that.data.courseName
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success(res) {
        wx.hideLoading()
        if (res.statusCode == 404) {
          wx.showToast({
            title: '无结果',
            icon: 'error',
            duration: 2000
          });
          return
        }
        else {
          console.log("搜索成功")
<<<<<<< HEAD
          console.log(res.data)
          const encodedObject = encodeURIComponent(JSON.stringify(res.data as Course[]));
          wx.navigateTo({
            url: "../courseDetail/courseDetailList?obj=" + encodedObject,
=======
          const id = (res.data as Course)._id
          wx.navigateTo({
            url: "../courseDetail/courseDetailList?id=" + id,
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
          })
        }
        return
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    })
  }
})