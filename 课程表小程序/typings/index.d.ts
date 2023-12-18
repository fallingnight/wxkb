<<<<<<< HEAD
/// <reference path="./types/index.d.ts" />

import { CourseTable } from "../miniprogram/dataStructure/dataStructure";

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    didILogin: boolean
    amIAdministrator: boolean
    courseTable:CourseTable[]
    nowCourseTableIndex:number
    usernameDisplay: string
    StatusBar: number
    CustomBar: number
    Custom?:WechatMiniprogram.ClientRect
  },
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
=======
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
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
}