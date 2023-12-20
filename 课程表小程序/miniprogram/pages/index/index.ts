import { getDateObjs,getFirstdayofDate } from '../../utils/util';
import {Course,CourseTable,CourseGroup} from '../../dataStructure/dataStructure';
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 0
        })
      }
      this.getCourseTable();
      this.getCourseGroup();
      this.getNowDate();
      this.getCourseData();

    }
  },
  data: {
    nowWeek: 1, //当前周数
    nowCourseTable:1,
    nowCourseGroup:1,
    daysPerWeek: 7,
    weekdayIndex: ['日','一', '二', '三', '四', '五', '六', '日'], 
    startDate: '2023/09/01', //开学日期
    isMonday:true, //周一第一天or周日第一天，以后做用户自定义配置的时候用，已经做好了自适应显示，可以手动切换观察显示效果
    totalWeek: 20,
    selectedMonth:1,
    checked:'1',
    showSelectWeek: false, //打开选择周数菜单
    showSelectCourseTable:false,
    showSelectCourseGroup:false,
    didILogin: app.globalData.didILogin,
    showMore: false, //打开更多菜单
    courseList: [] as Course[], //课程列表
    weekDateList:[] as number[], //当前周日期列表
    courseTableList:[]as CourseTable[],
    courseGroupList:[]as CourseGroup[],
  },
  methods: {
    //一些菜单的展开和关闭
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
    },
    unfoldWeek() {
      this.setData({
        showSelectWeek: true,
      });
    },
    hideSelectWeek() {
      this.setData({
        showSelectWeek: false,
      });
    },
    hideSelectCourseTable(){
      this.setData({
        showSelectCourseTable: false,
      });
    },
    selectCourseTable(){
      this.setData({
        showSelectCourseTable: true,
      });
    },
    selectCourseGroup(){
      this.setData({
        showSelectCourseGroup: true,
      });
    },
    hideSelectCourseGroup(){
      this.setData({
        showSelectCourseGroup: false,
      });
    },
    //选择周数
    selectWeek(e: any) {
      const week = e.currentTarget.dataset.week
      this.setData({
        nowWeek: week,
      });
    },
    selectNowTable(e: any) {
      const table = e.currentTarget.dataset.table
      this.setData({
        nowCourseTable: table,
      });
      app.globalData.nowCourseTableIndex=this.data.nowCourseTable-1;
      this.getCourseData();
    },
    selectNowGroup(e: any) {
      var that=this
      const group = e.currentTarget.dataset.group
      this.setData({
        nowCourseGroup: group,
      });
      wx.showModal({
        title: '请输入课程组名称',
        editable:true,
        placeholderText:'输入修改后的课程组名称',
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            const groupName = res.content;
            if (groupName.trim() !== "") {
              console.log(groupName)
              wx.request({
                url: 'http://localhost:3000/api/courseGroup/edit',
                method: 'POST',
                data: {
                  _id: that.data.courseGroupList[group-1]._id,
                  groupname: groupName
                },
                success: (res) => {
                  console.log('课程组修改成功:', res.data);
                  that.getCourseGroup();
                },
                fail: (error) => {
                  console.error('修改课程组失败:', error);
                }
              });
            } else {
              wx.showToast({
                title: '请输入有效的课程组名称',
                icon: 'none',
                duration: 2000
              });
            }
          }
        }
      });
      
    },
    onChangeShowGroups(e: any){
        this.setData({
          checked:e.detail
        })
    },
    showDetail(e: { currentTarget: { dataset: { item: any } } }) {
      const id = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: "../courseDetail/courseDetail?id=" + id,
      })
    },
    //获取选中周的日期
    getSelectedWeekDate(){
      const startDate=getFirstdayofDate(new Date(this.data.startDate),this.data.isMonday)
      const interval=(this.data.nowWeek-1)*7*24*60*60*1000
      const selectedFirstDate=startDate.getTime()+interval
      const {month:selectedMonth}=getDateObjs(new Date(selectedFirstDate))
      const weekDates=[]
      for(let i=0;i<this.data.daysPerWeek;i++){
        const date=new Date(selectedFirstDate +i*24*60*60*1000)
        const {day}=getDateObjs(date)
        weekDates.push(day)
      }
      this.setData({
        weekDateList:weekDates,
        selectedMonth:selectedMonth
      })

    },
    //获取当前日期（默认显示）
    getNowDate(){
      const startDate=getFirstdayofDate(new Date(this.data.startDate),this.data.isMonday)
      const nowDate=new Date().getTime()
      const time=nowDate-startDate.getTime()
      const week=Math.ceil(time/1000/60/60/24/7)
      const maxWeek=this.data.totalWeek
      if(week>maxWeek){
          this.setData({
            nowWeek:maxWeek,
          })
      }else{
          this.setData({
            nowWeek:week,
          })
      }
      this.getSelectedWeekDate()
    },
    getCourseTable(){
      var that=this
      wx.request({
        url: "http://localhost:3000/api/courseTable/get-courseTable",
        data: {
          "username": app.globalData.usernameDisplay
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        responseType: 'text',
  
        success(res) {
          app.globalData.courseTable=res.data as CourseTable[];
          console.log("获取课程表成功")
          that.setData({
            courseTableList:app.globalData.courseTable
          });
          console.log(app.globalData.courseTable[app.globalData.nowCourseTableIndex]._id);
        },
        fail() {
          wx.hideLoading()
          console.log("未能连上服务器数据库")
          return;
        }});
    },
    getCourseGroup(){
      var that=this
      wx.request({
        url: "http://localhost:3000/api/courseGroup/get-courseGroup",
        data: {
          "username": app.globalData.usernameDisplay
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        responseType: 'text',
  
        success(res) {
          console.log("获取课程组成功")
          that.setData({
            courseGroupList:res.data as CourseGroup[]
          });
        },
        fail() {
          wx.hideLoading()
          console.log("未能连上服务器数据库")
          return;
        }});
    },
    //获取课程信息
    getCourseData(){
      const that=this
      wx.request({
        //这是本地mock的测试链接，用的时候把这个换成后端处理对应请求的连接
        url: "http://localhost:3000/api/course/get-table-courses", 
        data: {
          username: app.globalData.usernameDisplay,
          _courseTableID:app.globalData.courseTable[app.globalData.nowCourseTableIndex]._id
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        responseType:'text',
  
        success(res) {
          that.setData({
            courseList: res.data as Course[]
          })
          console.log(res);
          console.log(app.globalData.courseTable[app.globalData.nowCourseTableIndex]._id)
          return
        },
      })
    },
    addCourseTable(){
      var that=this
      wx.request({
        url: "http://localhost:3000/api/courseTable/new",
        data: {
          "username": app.globalData.usernameDisplay,
        },
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        responseType: 'text',
  
        success(res) {
          console.log("创建课程表成功");
          that.getCourseTable();
        }});
      

    },
    addCourseGroup(){
      var that=this
      wx.showModal({
        title: '请输入课程组名称',
        editable:true,
        placeholderText:'输入新的课程组名称',
        showCancel: true,
        success: (res) => {
          if (res.confirm) {
            const groupName = res.content;
            if (groupName.trim() !== "") {
              wx.request({
                url: 'http://localhost:3000/api/courseGroup/new',
                method: 'POST',
                data: {
                  username: app.globalData.usernameDisplay,
                  groupname: groupName
                },
                success: (res) => {
                  console.log('课程组修改成功:', res.data);
                  that.getCourseGroup();
                },
                fail: (error) => {
                  console.error('修改课程组失败:', error);
                }
              });
            } else {
              wx.showToast({
                title: '请输入有效的课程组名称',
                icon: 'none',
                duration: 2000
              });
            }
          }else if (res.cancel) {
            // 用户点击了取消按钮
            console.log('用户取消输入');
          }
        }
      });

    },
    deleteCourseGroup(){
      let that = this
      wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          console.log(that.data.courseGroupList[that.data.nowCourseGroup-1]._id)
          wx.request({
            url: "http://localhost:3000/api/courseGroup/delete",
            data: {
              _id: that.data.courseGroupList[that.data.nowCourseGroup-1]._id,
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            responseType: 'text',

            success(res) {
              wx.hideLoading();
              if(res.statusCode!=404){
              console.log("删除成功")
              that.data.nowCourseGroup-=1;
              that.getCourseGroup();
              }else{
                wx.showToast({
                  title: '课程组非空',
                  icon: 'error',
                  duration: 1000
                });
                return
              }
            },
            fail() {
              wx.hideLoading()
              console.log("删除失败")
              return
            }
          })
        } 
      }
    })

    },
    deleteCourseTable(){
      let that = this
      wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: "http://localhost:3000/api/courseTable/delete",
            data: {
              "_id": app.globalData.courseTable[app.globalData.nowCourseTableIndex]._id
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            responseType: 'text',

            success(res) {
              wx.hideLoading()
              if(res.statusCode!=404){
              console.log("删除成功")
              console.log(res);
              that.data.nowCourseTable-=1;
              app.globalData.nowCourseTableIndex=that.data.nowCourseTable-1;
              that.getCourseTable();
            }else{
              wx.showToast({
                title: '课程表非空',
                icon: 'error',
                duration: 1000
              });
              return
            }
            },
            fail(res) {
              wx.hideLoading()
              console.log("删除失败")

              return
            }
          })
        } 
      }
    })
    },

}})




