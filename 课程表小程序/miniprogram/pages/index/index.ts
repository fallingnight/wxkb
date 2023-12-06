import { getDateObjs,getFirstdayofDate } from '../../utils/util';
import {Course} from '../../dataStructure/dataStructure';
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
      this.getCourseData()
      this.getNowDate()
    }
  },
  data: {
    nowWeek: 1, //当前周数
    daysPerWeek: 7,
    weekdayIndex: ['日','一', '二', '三', '四', '五', '六', '日'], 
    startDate: '2023/09/01', //开学日期
    isMonday:true, //周一第一天or周日第一天，以后做用户自定义配置的时候用，已经做好了自适应显示，可以手动切换观察显示效果
    totalWeek: 20,
    selectedMonth:1,
    showSelectWeek: false, //打开选择周数菜单
    didILogin: app.globalData.didILogin,
    showMore: false, //打开更多菜单
    courseList: [] as Course[], //课程列表
    weekDateList:[] as number[] //当前周日期列表
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
    //选择周数
    selectWeek(e: any) {
      const week = e.currentTarget.dataset.week
      this.setData({
        nowWeek: week,
      });
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
    //获取课程信息
    getCourseData(){
      const that=this
      wx.request({
        //这是本地mock的测试链接，用的时候把这个换成后端处理对应请求的连接
        url: "http://localhost:3000/api/course/get-all-courses", 
        data: {
          username: app.globalData.usernameDisplay
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
          return
        },
      })
    }

  }
})




