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
  },
  courseNameInputAction: function (options: { detail: any }) {
    this.data.courseName=options.detail.value
  },
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
    })
  }
})