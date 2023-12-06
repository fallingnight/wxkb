var app = getApp()
Component({
  pageLifetimes: {
    show() {
      this.setData({
        didILogin: app.globalData.didILogin
      })
      wx.reLaunch({
        url: '/miniprogram/components/addAndEditHead/addAndEditHead'
      })
    }
  },

  properties: {
    pageIndex: {
      type: Number
    },
  },
  
  data: {
    didILogin:app.globalData.didILogin,
  },
 
  methods: {
    toAddPage: function () {
      if (this.properties.pageIndex === 0) {
        wx.navigateTo({
          url: "../../pages/newXXX/newCourse/newCourse"
        })
      }
      if (this.properties.pageIndex === 1) {
        wx.navigateTo({
          url: "../../pages/newXXX/newAnnouncement/newAnnouncement"
        })
      }
      if (this.properties.pageIndex === 2) {
        wx.navigateTo({
          url: "../../pages/newXXX/newBacklog/newBacklog"
        })
      }
      if (this.properties.pageIndex === 4) {
        wx.navigateTo({
          url: "../../pages/newXXX/newCoursedata/newCoursedata"
        })
      }
    },
    toEditPage: function () {
      if (this.properties.pageIndex === 0) {
        wx.navigateTo({
          url: "../../pages/editXXX/editCourse/editCourse"
        })
      }
      if (this.properties.pageIndex === 1) {
        wx.navigateTo({
          url: "../../pages/editXXX/editAnnouncement/editAnnouncement"
        })
      }
      if (this.properties.pageIndex === 2) {
        wx.navigateTo({
          url: "../../pages/editXXX/editBacklog/editBacklog"
        })
      }
      if (this.properties.pageIndex === 4) {
        wx.navigateTo({
          url: "../../pages/search/searchCoursedata"
        })
      }
    },
  }
})
