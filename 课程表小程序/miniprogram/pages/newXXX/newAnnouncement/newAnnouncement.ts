var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: { type: String, value: "null" },
    content: String,
    createTime: String
  },

  inputForm(data: { detail: { value: { title: string } } }) {
    if (data.detail.value.title=='null') {
      wx.showToast({
        title: '标题为空',
        icon: 'error',
        duration: 1000
      })
      return
    }

    wx.showLoading({
      title: "上传中"
    })
    wx.request({
      url: "http://localhost:3000/api/announcement/new",
      data: {
        "username": app.globalData.usernameDisplay,
        "createTime": this.getNowDate(),
        "title": data.detail.value.title,
        "content": this.data.content
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

  getContent(e: { detail: { value: StringConstructor } }) {
    this.data.content=e.detail.value
  },

  getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var hours = myDate.getHours(); //获取当前小时
    var minutes = myDate.getMinutes(); //获取当前分钟
    var seconds = myDate.getSeconds(); //获取当前秒
    var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return now;
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