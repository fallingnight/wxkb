/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    didILogin: boolean
    amIAdministrator: boolean
    usernameDisplay: string
    StatusBar: number
    CustomBar: number
    Custom?:WechatMiniprogram.ClientRect
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}