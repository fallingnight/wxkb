<<<<<<< HEAD
import {Coursedata} from '../../dataStructure/dataStructure';
var app = getApp()
Page({
  onLoad(){
    var that = this;
    wx.request({
       url: "http://localhost:3000/admin/courses",
       header: {
         'content-type': 'application/json'
         },
         method: 'GET',

       success(res) {
           console.log("信息获取成功")
           that.setData({
             courseList:res.data as Coursedata[],
           });
  },
  fail(error) {
    console.error(`未能连上数据库！`, error);
  }});
  }
  ,
  data: {
    courseName: '' as string,
    searchResult: [],
    courseList: [] as Coursedata[]
=======
import {Course} from '../../dataStructure/dataStructure';
var app = getApp()
Page({
  data: {
    courseName: '' as string
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  },
  courseNameInputAction: function (options: { detail: any }) {
    this.data.courseName=options.detail.value
  },
<<<<<<< HEAD
  searchTextChange(e: {detail: {value: ''}}) {
    this.setData({
      courseName: e.detail.value
    })
  },
  searchCourse() {
    console.log(this.data.courseName)
    var searchResult = []
    for(var i = 0; i < this.data.courseList.length; i++) {
      var currentCourse = this.data.courseList[i];
      if(currentCourse.courseName.search(this.data.courseName) >= 0 ||
      currentCourse.place.search(this.data.courseName) >= 0 ||
      currentCourse.teacher.search(this.data.courseName) >= 0||currentCourse.schoolID.search(this.data.courseName)>=0) {
        searchResult.push(currentCourse)
      }
    }
    this.setData({
      searchResult: searchResult
    })
  },
  toEdit(e:{currentTarget:{dataset:{id:any}}}) {
    console.log(e.currentTarget.dataset.id)
    var id = e.currentTarget.dataset.id
   wx.navigateTo({
     url: "../../pages/editXXX/editCoursedata/editCoursedata?id=" + id
=======
  inputForm(){
    var that = this;
    wx.showLoading({
      title: "登录中"
    })
    wx.request({
      url: "http://localhost:3000/api/course/search",
      data: {
        "username": app.globalData.usernameDisplay,
        "courseName": that.data.courseName
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success(res) {
        wx.hideLoading()
        if (res.statusCode == 404) {
          wx.showToast({
            title: '无结果',
            icon: 'error',
            duration: 2000
          });
          return
        }
        else {
          console.log("搜索成功")
          const id = (res.data as Course)._id
          wx.navigateTo({
            url: "../editXXX/editCoursedata/editCoursedata?id=" + id,
          })
        }
        return
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    })
  }
})