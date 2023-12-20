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
}