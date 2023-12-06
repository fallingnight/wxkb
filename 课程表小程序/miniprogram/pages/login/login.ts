import {User} from '../../dataStructure/dataStructure';
var app = getApp();
Page({
  data: {
    username_value: {
      type: String
    },
    password_value: {
      type: String
    }
  },
  inputForm(data: { detail: { value: { username_value: any; password_value: any } } }) {
    wx.showLoading({
      title: "登录中"
    })
    wx.request({
      url: "http://localhost:3000/api/login",
      data: {
        "username": data.detail.value.username_value,
        "password": data.detail.value.password_value
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success(res) {
        wx.hideLoading()
        if (res.statusCode == 422) {
          wx.showToast({
            title: '无此用户或密码错误',
            icon: 'error',
            duration: 2000
          });
          return
        }
        else {
          console.log("登录成功")
          app.globalData.didILogin = true
          app.globalData.usernameDisplay = data.detail.value.username_value,
          app.globalData.accountStatus = (res.data as User).accountStatus,
          wx.navigateBack();
        }
        return
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    })
  },

  usernameInputAction: function (options: { detail: any }) {
    let value = options.detail.value
    console.log(value)
  }
})