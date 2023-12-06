import {Course} from '../../dataStructure/dataStructure'
var app = getApp()
Page({
  data: {
    whichDay: ['一','二','三','四','五','六','日'],
    courseList: [] as Course[],
  },

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
  },
  editThis(e: { currentTarget: { dataset: { item: any } } }) {
    const id = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../editXXX/editCourse/editInput?id=" + id,
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