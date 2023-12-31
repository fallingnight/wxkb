import {Announcement} from '../../dataStructure/dataStructure';
var app = getApp();
Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' &&
        this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      this.setData({
          didILogin: app.globalData.didILogin,
         isAdmin:app.globalData.amIAdministrator,
       })
       /*
      this.setData({
          announcementList: [
          {
            title: '关于2023-2024学年春季学期课程选课安排的通知',
            _id: '1',
            createTime: '2023-01-02',
            lastEditTime: '2023-01-02',
            username: 'John Doe',
            content:''
          },
          {
            title: '公告标题2',
            _id: '2',
            createTime: '2023-02-01',
            lastEditTime: '2023-02-02',
            username: 'Jane Smith',
            content:''
          }
          // 添加更多公告项...
        ]
      });
      */
      var that = this
       wx.request({
          url: "http://localhost:3000/api/announcements",
          header: {
            'content-type': 'application/json'
            },
            method: 'GET',

          success(res) {
              console.log("信息获取成功")
              that.setData({
                announcementList: res.data as Announcement[]
                })
               return
    }
  })}
  },
  data: {
    didILogin: false,
    showMore: false,
    isAdmin: false,
    announcementList: [] as Announcement[],
  },
  methods: {
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
    },
  },
});