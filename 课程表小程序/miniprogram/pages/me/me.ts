<<<<<<< HEAD
import {User} from '../../dataStructure/dataStructure';
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
      this.setData({
        didILogin: app.globalData.didILogin,
        usernameDisplay: app.globalData.usernameDisplay
      })
      if(this.data.didILogin){
        this.getStatus()
      }    
    }
  },
  methods: {
    toRegisterPage: function () {
      wx.navigateTo({
        url: "../register/register"
      })
    },
    toLoginPage: function () {
      wx.navigateTo({
        url: "../login/login"
      })
    },
    toLogout: function () {
      app.globalData.didILogin = false
      app.globalData.usernameDisplay = ""
      wx.reLaunch({
        url: './me'
      })
    },
    setStatus: function () {
      wx.request({
        url: "http://localhost:3000/api/me/set-status",
        header: {
          'content-type': 'application/json'
        },
        data: {
          username: app.globalData.usernameDisplay,
          accountStatus: this.data.accountStatus
        },
        method: 'POST',

        success() {
          console.log("修改状态成功！")
        }
      })
    },
    getStatus: function () {
      var that = this;
      wx.request({
        url: "http://localhost:3000/api/me/get-status",
        header: {
          'content-type': 'application/json'
        },
        data: {
          username: app.globalData.usernameDisplay,
        },
        method: 'POST',
        
        success(res) {
          that.setData({
            accountStatus: (res.data as User).accountStatus,

          }
          );
          app.globalData.amIAdministrator = (res.data as User).admin;
          console.log(app.globalData.amIAdministrator)
        }
      })
    },
    bindPickerChange: function (e: { detail: { value: any } }) {
      this.setData({
        accountStatus: e.detail.value
      })
    },
  },
  data: {
    didILogin: app.globalData.didILogin,
    usernameDisplay: app.globalData.usernameDisplay,
    accountStatus: app.globalData.accountStatus,
    array: ["上课中", "休息中", "忙碌", "离线"]
  },
})




=======
import { composeRawBufferEntity3DWhole } from "XrFrame/kanata/lib/index";
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 3
        })
      }
      this.setData({
        didILogin: app.globalData.didILogin,
        usernameDisplay: app.globalData.usernameDisplay
      })
      if(this.data.didILogin){
        this.getStatus()
      }    
    }
  },
  methods: {
    toRegisterPage: function () {
      wx.navigateTo({
        url: "../register/register"
      })
    },
    toLoginPage: function () {
      wx.navigateTo({
        url: "../login/login"
      })
    },
    toLogout: function () {
      app.globalData.didILogin = false
      app.globalData.usernameDisplay = ""
      wx.reLaunch({
        url: './me'
      })
    },
    setStatus: function () {
      wx.request({
        url: "http://localhost:3000/api/me/set-status",
        header: {
          'content-type': 'application/json'
        },
        data: {
          username: app.globalData.usernameDisplay,
          accountStatus: this.data.accountStatus
        },
        method: 'POST',

        success() {
          console.log("修改状态成功！")
        }
      })
    },
    getStatus: function () {
      var that = this;
      wx.request({
        url: "http://localhost:3000/api/me/get-status",
        header: {
          'content-type': 'application/json'
        },
        data: {
          username: app.globalData.usernameDisplay,
        },
        method: 'POST',
        
        success(res) {
          that.setData({
            accountStatus: (res.data as myDataType).accountStatus
          })
        }
      })
    },
    bindPickerChange: function (e: { detail: { value: any } }) {
      this.setData({
        accountStatus: e.detail.value
      })
    },
  },
  data: {
    didILogin: app.globalData.didILogin,
    usernameDisplay: app.globalData.usernameDisplay,
    accountStatus: app.globalData.accountStatus,
    array: ["上课中", "休息中", "忙碌", "离线"]
  },
})




>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
