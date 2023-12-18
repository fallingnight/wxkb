import {Backlog, Course, Reminder} from '../../../dataStructure/dataStructure';
var app=getApp()
Page({
  data:{
    checked:'2',
    whichDay: ['一','二','三','四','五','六','日'],
    courseStr:'',
    backlog:{}as Backlog,
    courseRawList:[] as Course[],
    courseList:[] as CourseString[],
    courseListShow:[] as CourseString[]
  },
  onChangeCourse(e: any){
    this.setData({
      checked:e.detail
    })
    if(this.data.checked=='2'){
      this.setData({
        'backlog.courseID':''
      })
    }
},
bindPickerCourse: function (e: { detail: { value: any } }) {
  let i = e.detail.value;
  let content = this.data.courseListShow[i].content;
  let id = this.data.courseListShow[i]._id;
  const matchingItem = this.data.courseRawList.find(item => item._id === id);
  this.setData({
    courseStr:content
  });
  if(matchingItem){
    this.setData({
      'backlog.courseID':matchingItem._id
    })
  }
},
handleCourseInput: function (e: { detail: { value: any } }) {
  let val = e.detail.value;
  const courselist =this.data.courseList;             
  if(val){
    let a =courselist.filter(item => item.content.indexOf(val) != -1)
    this.setData({courseListShow:a})
  }
  else{
    this.setData({courseListShow:this.data.courseList})
  }
},

  onLoad: function (options: { id: any }){//这里查信息也是要用post，因为你传入的也有！！！
    console.log(options.id);
    this.getAllCourse();
    var that=this;
    wx.request({
      url: "http://localhost:3000/api/backlog/get-specific-backlog",
      data: {
        "_id": options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success(res) {
        console.log("信息获取成功")
        that.setData({
          backlog: (res.data as Backlog)[0],
        })
        wx.request({
          url: "http://localhost:3000/api/reminder/get-specific-reminder",
          data: {
            "_id": (res.data as Backlog)[0].reminderID,
          },
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
    
          success(res) {
            that.setData({
              reminder: res.data as Reminder,
            })
            if(that.data.backlog.courseID){
              
              let content='';
              that.data.courseList.forEach(item => {
                  if (item._id==that.data.backlog.courseID){
                    content=item.content;
                  }
                
              });
              that.setData({
                checked:'1',
                courseStr:content
              })

            }

          }})

        return
      },
    })
  },
  onUnload() {
    if((this.data.checked=='1' && this.data.backlog.courseID)||(this.data.checked=='2'&&!this.data.backlog.courseID)){
        wx.request({
          url: "http://localhost:3000/api/backlog/edit",
          data: this.data.backlog,
          header: {
            'content-type': 'application/json'
          },
          method: 'POST',
          responseType: 'text',
  
          success() {
            wx.hideLoading()
            console.log("关联课程成功")
            wx.navigateBack()
          },
          fail() {
            wx.hideLoading()
            console.log("未能连上服务器数据库")
            return
          }
        });
        
      }

  },

  getAllCourse() {
    var that = this;
    wx.request({
      url: "http://localhost:3000/api/course/get-all-courses",
      data: {
        username: app.globalData.usernameDisplay
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      success(res) {
        console.log("信息获取成功")
        const clist=res.data as Course[];
        const cslist: CourseString[]=[];
        clist.forEach(async (course) => {
          const content=course.courseName+' '+course.teacher+' '+course.place+' 星期'+that.data.whichDay[course.whichDay];
          const id=course._id;
          const coursestring={_id:id,content:content};
          cslist.push(coursestring)
        }
      )
        that.setData({
          courseRawList:clist,
          courseList:cslist,
          courseListShow:cslist
        });
    },
      fail(error) {
        console.error(`未能连上数据库！`, error);
      }
    })

  },

});

interface CourseString{
  _id:string;
  content:string;
}