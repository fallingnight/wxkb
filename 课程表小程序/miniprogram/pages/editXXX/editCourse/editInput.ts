import { Course } from '../../../dataStructure/dataStructure';
import { hex2rgb, rgb2hex } from '../../../utils/util';
var app = getApp();

Page({
  data: {
    _id: String,
    courseName: { type: String, value: "null" },
    teacher: { type: String },
    dayArray: ['一', '二', '三', '四', '五', '六', '日'],
    groupArray: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    color: '' as string,
    pick: false,
    dayObjectArray: [
      {
        id: 0,
        name: '一'
      },
      {
        id: 1,
        name: '二'
      },
      {
        id: 2,
        name: '三'
      },
      {
        id: 3,
        name: '四'
      },
      {
        id: 4,
        name: '五'
      },
      {
        id: 5,
        name: '六'
      },
      {
        id: 6,
        name: '日'
      },
    ],
    dayIndex: 0,
    groupIndex: 0,
    startTime: '6',
    endTime: '7'
  },
  bindPickerChange: function (e: { detail: { value: any } }) {
    this.setData({
      dayIndex: e.detail.value
    })
  },
  bindStartTimeChange: function (e: { detail: { value: any } }) {
    this.setData({
      startTime: e.detail.value
    })
  },
  bindEndTimeChange: function (e: { detail: { value: any } }) {
    this.setData({
      endTime: e.detail.value
    })
  },
  bindGroupChange: function (e: { detail: { value: any } }) {
    this.setData({
      groupIndex: e.detail.value
    })
  },
  pickColor: function (e: { detail: { color: any; }; }) {
    console.log("1")
    this.setData({
      color: e.detail.color
    })
  },
  toPick: function () {
    console.log("2")
    this.setData({
      pick: true
    })
    console.log(this.data.pick)
  },
  inputForm(data: { detail: { value: { courseName: string; teacher: any; }; }; }) {
    if (data.detail.value.courseName == 'null') {
      wx.showToast({
        title: '课程名为空',
        icon: 'error',
        duration: 1000
      })
      return
    }
    if (this.data.startTime > this.data.endTime) {
      wx.showToast({
        title: '时间设置错误',
        icon: 'error',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: "上传中"
    })
    wx.request({
      url: "http://localhost:3000/api/course/edit",
      data: {
        "_id": this.data._id,
        "username": app.globalData.usernameDisplay,
        "courseName": data.detail.value.courseName,
        "whichDay": this.data.dayIndex,
        "startTime": this.data.startTime,
        "endTime": this.data.endTime,
        "teacher": data.detail.value.teacher,
        "group": this.data.groupIndex,
        "color": rgb2hex(this.data.color)
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success() {
        wx.hideLoading()
        console.log("添加成功")
        wx.navigateBack()
        return
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    })
  },

  onLoad: function (options: { id: any }) {
    var that = this
    this.data._id = options.id
    wx.request({
      url: "http://localhost:3000/api/course/get-specific-course",
      data: {
        "_id": options.id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success: res => {
        that.setData({
          groupIndex: (res.data as Course[])[0].group,
          _res: res.data,
          dayIndex: (res.data as Course[])[0].whichDay,
          startTime: (res.data as Course[])[0].startTime,
          endTime: (res.data as Course[])[0].endTime,
        })
        const rgbColor = hex2rgb((res.data as Course[])[0].color);
        if (rgbColor !== null) {
          that.setData({
            color: rgbColor
          })
        } else {
          this.data.color = 'rgb(255,255,255)';
        }
      }
    })
  },

  delete() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: "http://localhost:3000/api/course/delete",
            data: {
              "_id": that.data._id
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            responseType: 'text',

            success() {
              wx.hideLoading()
              console.log("删除成功")
              wx.switchTab({
                url: '../../index/index'
              })
            },
            fail() {
              wx.hideLoading()
              console.log("未能连上服务器数据库")
              return
            }
          })
        }
      }
    })
  },
})