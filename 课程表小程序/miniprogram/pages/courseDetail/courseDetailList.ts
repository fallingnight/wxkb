import {Course} from '../../dataStructure/dataStructure'
var app = getApp()
Page({
  data: {
    whichDay: ['一','二','三','四','五','六','日'],
    courseList: [] as Course[],
  },

  onLoad: function (options: { obj: any }){//这里查信息也是要用post，因为你传入的也有！！！
    var that=this;
    const decodedObject = JSON.parse(decodeURIComponent(options.obj)) as Course[];
    that.setData({
      courseList:decodedObject
    })
    console.log(decodedObject)
  },
  editThis(e: { currentTarget: { dataset: { item: any } } }) {
    const id = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "courseDetail?id=" + id,
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