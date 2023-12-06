import { rgb2hex } from '../../../utils/util';
var app = getApp();
const brightColors = [
  'rgb(255, 87, 51)', 'rgb(255, 215, 0)', 'rgb(199, 21, 133)', 'rgb(32, 178, 170)',
  'rgb(186, 85, 211)', 'rgb(50, 205, 50)', 'rgb(65, 105, 225)',
  'rgb(255, 99, 71)', 'rgb(138, 43, 226)', 'rgb(0, 255, 127)', 'rgb(255, 140, 0)',
  'rgb(139, 0, 139)', 'rgb(0, 250, 154)', 'rgb(30, 144, 255)'
  // 随机列表
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseName: { type: String, value: "null" },
    teacher: { type: String },
    dayArray: ['一', '二', '三', '四', '五', '六', '日'],
    groupArray: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    color: brightColors[Math.floor(Math.random() * brightColors.length)],
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
    this.setData({
      color: e.detail.color
    })
  },
  toPick: function () {
    this.setData({
      pick: true
    })
  },
  inputForm(data: { detail: { value: { courseName: string; teacher: any; }; }; }) {
    if (data.detail.value.courseName == 'null') {
      console.log(data.detail.value.courseName, this.data.startTime)
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
      url: "http://localhost:3000/api/course/new",
      data: {
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


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({
      color:brightColors[Math.floor(Math.random() * brightColors.length)]
    });
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})