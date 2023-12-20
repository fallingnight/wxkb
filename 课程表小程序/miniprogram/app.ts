import { IAppOption } from "../typings";
import { CourseTable } from "./dataStructure/dataStructure";

// app.ts
App<IAppOption>({
  globalData: {
    didILogin: false, // 这里太脑瘫了
    usernameDisplay: '',
    amIAdministrator: false,
    courseTable:[] as CourseTable[],
    nowCourseTableIndex:0,
    StatusBar: 0,
    CustomBar: 0
  },
  onLaunch() {
    // 展示本地存储能力
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })

    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})
