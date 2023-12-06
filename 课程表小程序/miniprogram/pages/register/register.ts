// pages/register/register.ts
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username_value: {
      type: String
    },
    password_value: {
      type: String
    },
    passwordAgain_value: {
      type: String
    }
  },
  inputForm(data: { detail: { value: { username_value: any; password_value: any; passwordAgain_value: any} } }) {
    if(data.detail.value.password_value!=data.detail.value.passwordAgain_value){
      console.log("两次密码不一致")
      console.log(data.detail.value.username_value)
      console.log(data.detail.value.passwordAgain_value)
      return
    }
    console.log("注册启动")
    wx.showLoading({
      title: "注册中"
    })
    wx.request({
      url: "http://localhost:3000/api/register",
      data: {
        "username": data.detail.value.username_value,
        "password": data.detail.value.password_value,
        "accountStatus": 0 as number
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success(res) {
        if(res.statusCode == 422){
          wx.showToast({
            title: '该用户名已存在',
            icon: 'error',
            duration: 1000
          });
          return
        }
        wx.hideLoading()
        console.log("注册成功")
        wx.navigateBack()
        return
      },
      fail(){
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

  },

  usernameInputAction: function(options: { detail: any }){
    let value=options.detail.value
    console.log(value)
  }
})