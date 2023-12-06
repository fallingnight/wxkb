var app = getApp()
Page({
  data: {
    whichDay: ['一','二','三','四','五','六','七'],
    whichTime: ['1','2','3','4','5','6','7','8','10','11','12']
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
          list: res.data
        })
        return
      },
    })
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