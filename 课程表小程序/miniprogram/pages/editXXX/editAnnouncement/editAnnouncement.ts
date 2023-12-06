var app = getApp()
Page({
  data: {
  },

  onLoad() {//这里查信息也是要用post，因为你传入的也有！！！
    var that = this
    wx.request({
      url: "http://localhost:3000/api/announcements",
      header: {
        'content-type': 'application/json'
      },
      method: 'GET',

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