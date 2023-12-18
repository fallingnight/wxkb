import { Backlog, Course, CourseGroup, Reminder } from "../../dataStructure/dataStructure"

var app=getApp()
// pages/courseDetail/courseDetail.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CourseTimeMap : {
      1: { start: "08:15", end: "09:00" },
      2: { start: "09:10", end: "09:55" },
      3: { start: "10:15", end: "11:00" },
      4: { start: "11:10", end: "11:55" },
      5: { start: "13:50", end: "14:35" },
      6: { start: "14:45", end: "15:40" },
      7: { start: "15:40", end: "16:25" },
      8: { start: "16:45", end: "17:30" },
      9: { start: "17:40", end: "18:25" },
      10: { start: "19:20", end: "20:05" },
      11: { start: "20:15", end: "21:00" },
      12: { start: "21:10", end: "21:55" }
    },
    whichDayArray: ['一', '二', '三', '四', '五', '六', '日'],
    course:{}as Course,
    backlogList:[]as Backlog[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { id: any }){
    var that = this
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
        const thisCourse=res.data[0] as Course;
        that.setData({course:thisCourse})
        wx.request({
          url: "http://localhost:3000/api/courseGroup/get-specific-courseGroup",
          data: {
            "_id": thisCourse.group
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          responseType: 'text',
    
          success: res => {
            const thisGroup=res.data[0] as CourseGroup;
            wx.request({
              url: "http://localhost:3000/api/reminder/get-specific-reminder",
              data: {
                "_id": thisCourse.reminderID
              },
              header: {
                'content-type': 'application/json'
              },
              method: 'POST',
              responseType: 'text',
        
              success: res => {
                const thisreminder=res.data[0] as Reminder;
                that.setData({
                  reminder:thisreminder,
                  group:thisGroup
                })      
                wx.request({
                  url: "http://localhost:3000/api/backlog/get-backlog",
                  header: {
                    'content-type': 'application/json'
                    },
                    data: {
                     "username": app.globalData.usernameDisplay,
                     "courseID": that.data.course._id
                   },
                    method: 'POST',
                    responseType: 'text',
         
                  success(res) {
                      that.setData({
                        backlogList: res.data as Backlog[]
                      })
                    
                  }})
          }})
                  
                  
      }})
    }})},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

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