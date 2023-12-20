import {Coursedata} from '../../dataStructure/dataStructure'; 

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
    }})}
  },
  data: {
    didILogin: app.globalData.didILogin,
    showMore: false, //打开更多菜单
    whichDayArray: ['一', '二', '三', '四', '五', '六', '日'],
    courseList: [] as Coursedata[]
  },
  methods: {
    //一些菜单的展开和关闭
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
    },
    //获取课程信息
    toEdit(e: { currentTarget: { dataset: { id: any } } }) {
      const id = e.currentTarget.dataset.id;
      console.log(id);
     wx.navigateTo({
       url: "../../pages/editXXX/editCoursedata/editCoursedata?id=" + id
      })
    }
  }
})




