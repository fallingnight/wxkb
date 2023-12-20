import { getNowFullTime} from '../../../utils/util';

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
        "createTime": getNowFullTime(),
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
        if(res.statusCode!=404){
          console.log("添加成功")
          }else{
            wx.showToast({
              title: '公告已达上限',
              icon: 'error',
              duration: 1000
            });
            return
          }
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