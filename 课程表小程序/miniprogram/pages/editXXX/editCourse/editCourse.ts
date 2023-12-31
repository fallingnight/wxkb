import { Course, CourseGroup } from "../../../dataStructure/dataStructure"

var app = getApp()
Page({
  data: {
    whichDay: ['一','二','三','四','五','六','日'],
    courseList:[] as Course[],
    groupnameList:[] as string[],
    courseGroupList:[]as CourseGroup[],  
  },

  onLoad() {//这里查信息也是要用post，因为你传入的也有！！！
    var that = this
    wx.request({
      url: "http://localhost:3000/api/course/get-all-courses",
      data: {
        username: app.globalData.usernameDisplay
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success(res) {
        console.log("信息获取成功")
        that.setData({
          courseList: res.data as Course[]
        })
        return
      },
    })
    var that=this
      wx.request({
        url: "http://localhost:3000/api/courseGroup/get-courseGroup",
        data: {
          "username": app.globalData.usernameDisplay
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        responseType: 'text',
  
        success(res) {
          console.log("获取课程组成功")
          that.setData({
            courseGroupList:res.data as CourseGroup[]
          });
          const names: (string)[]=[]
          that.data.courseList.forEach(async (course, index) => 
          {
              let id = course.group;
              const matchingItem = that.data.courseGroupList.find(item => item._id === id) as CourseGroup;
              names.push(matchingItem.groupname);
          });
          that.setData({
              groupnameList:names
          })
        },
        fail() {
          wx.hideLoading()
          console.log("未能连上服务器数据库")
          return;
        }});
  },
  editThis(e: { currentTarget: { dataset: { item: any } } }) {
    const id = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "editInput?id=" + id,
    })
  },

  onReady() {

  },


  onShow() {
    this.onLoad()
  },

  onHide() {

  },


  onUnload() {

  },


  onPullDownRefresh() {

  },

  onReachBottom() {

  },


  onShareAppMessage() {

  }
})