var app = getApp()
const commonlist=[{
  pagePath: "/pages/index/index",
  text: "主页",
  iconPath: "/images/main_page.png",
  selectedIconPath: "/images/main_page_active.png"
},
{
  pagePath: "/pages/announcement/announcement",
  text: "公告",
  iconPath: "/images/announcement.png",
  selectedIconPath: "/images/announcement_active.png"
},
{
  pagePath: "/pages/backlog/backlog",
  text: "备忘录",
  iconPath: "/images/backlog.png",
  selectedIconPath: "/images/backlog_active.png"
},
{
  pagePath: "/pages/me/me",
  text: "我",
  iconPath: "/images/me.png",
  selectedIconPath: "/images/me_active.png"
},
];
const adminList=[{
  pagePath: "/pages/adminCourseManagement/adminCourseManagement",
  text: "数据管理",
  iconPath: "/images/main_page.png",
  selectedIconPath: "/images/main_page_active.png"
},
{
  pagePath: "/pages/announcement/announcement",
  text: "公告",
  iconPath: "/images/announcement.png",
  selectedIconPath: "/images/announcement_active.png"
},
{
  pagePath: "/pages/backlog/backlog",
  text: "备忘录",
  iconPath: "/images/backlog.png",
  selectedIconPath: "/images/backlog_active.png"
},
{
  pagePath: "/pages/me/me",
  text: "我",
  iconPath: "/images/me.png",
  selectedIconPath: "/images/me_active.png"
},
];
Component({
  pageLifetimes: {
    show() {
<<<<<<< HEAD
=======
      this.setData({
        isAdmin:app.globalData.amIAdministrator,
      })
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00

    }},
  data: {
    selected: 3,
    color: "#7A7E83",
    selectedColor: "#50d0d0",
<<<<<<< HEAD
    list: app.globalData.amIAdministrator?adminList:commonlist,
    isAdmin: false,

  },
  lifetimes:{
    attached(){
     if(app.globalData.amIAdministrator!=this.data.isAdmin&&app.globalData.amIAdministrator!=undefined){
       this.setData({
        list: app.globalData.amIAdministrator?adminList:commonlist,
        isAdmin:app.globalData.amIAdministrator
       });
     }
    }
  },

=======
    isAdmin:app.globalData.amIAdministrator,
    list: app.globalData.amIAdministrator?adminList:commonlist,

  },
  attached() {},
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      if (app.globalData.didILogin == false && (data.index == 0 || data.index == 2)) {
        wx.showToast({
          title: '请先登录',
          icon: 'error',
          duration: 1000
        });
        return
      }
<<<<<<< HEAD
      this.setData({
        selected: data.index,
      });
      wx.switchTab({
        url:url,
      })
  },
},

=======
      wx.switchTab({
        url:url,
      })
      this.setData({
        selected: data.index
      })
    }
  }
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
})