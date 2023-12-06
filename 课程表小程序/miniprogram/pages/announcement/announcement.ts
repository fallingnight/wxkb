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
            list: res.data
          })
          return
        },
      })
    }
  },

  data: {
    didILogin: 'false',
    showMore: false,
    isAdmin:false,
  },
  methods:{
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
    },
  }
})
