import {Course} from '../../dataStructure/dataStructure'
var app = getApp()
Page({
  data: {
    whichDay: ['一','二','三','四','五','六','日'],
    courseList: [] as Course[],
  },

<<<<<<< HEAD
  onLoad: function (options: { obj: any }){//这里查信息也是要用post，因为你传入的也有！！！
    var that=this;
    const decodedObject = JSON.parse(decodeURIComponent(options.obj)) as Course[];
    that.setData({
      courseList:decodedObject
    })
    console.log(decodedObject)
=======
  onLoad: function (options: { id: any }){//这里查信息也是要用post，因为你传入的也有！！！
    var that=this;
    wx.request({
      url: "http://localhost:3000/api/course/get-specific-course",
      data: {
        "_id": options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success(res) {
        console.log("信息获取成功")
        that.setData({
          courseList: res.data as Course[],
        })
        return
      },
    })
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  },
  editThis(e: { currentTarget: { dataset: { item: any } } }) {
    const id = e.currentTarget.dataset.item;
    wx.navigateTo({
<<<<<<< HEAD
      url: "courseDetail?id=" + id,
=======
      url: "../editXXX/editCourse/editInput?id=" + id,
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
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