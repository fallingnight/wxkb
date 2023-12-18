<<<<<<< HEAD
import {Coursedata} from '../../dataStructure/dataStructure'; 

=======
//import {Course} from '../../dataStructure/dataStructure'; 数据结构请写在这个文件里
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
<<<<<<< HEAD
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
=======
          selected: 4
        })
      }
    }
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  },
  data: {
    didILogin: app.globalData.didILogin,
    showMore: false, //打开更多菜单
<<<<<<< HEAD
    whichDayArray: ['一', '二', '三', '四', '五', '六', '日'],
    courseList: [] as Coursedata[]
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  },
  methods: {
    //一些菜单的展开和关闭
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
    },
    //获取课程信息
<<<<<<< HEAD
    toEdit(e: { currentTarget: { dataset: { id: any } } }) {
      const id = e.currentTarget.dataset.id;
      console.log(id);
     wx.navigateTo({
       url: "../../pages/editXXX/editCoursedata/editCoursedata?id=" + id
      })
    }
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  }
})




