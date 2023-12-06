//import {Course} from '../../dataStructure/dataStructure'; 数据结构请写在这个文件里
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 4
        })
      }
    }
  },
  data: {
    didILogin: app.globalData.didILogin,
    showMore: false, //打开更多菜单
  },
  methods: {
    //一些菜单的展开和关闭
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
    },
    //获取课程信息
  }
})




