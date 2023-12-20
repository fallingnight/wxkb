import {Backlog} from '../../../dataStructure/dataStructure';
Page({
  data: {
    backlog:{} as Backlog,
  },

  onLoad: function (options: { id: any }) {
    var that = this
    wx.request({
      url: "http://localhost:3000/api/backlog/get-specific-backlog",
      data: {
        "_id": options.id
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success: res => {
        that.setData({
          backlog: (res.data as Backlog)[0]
        })
      }
    })

  },

  getContent(e: { detail: { value: string } }) {
    this.data.backlog.content = e.detail.value
  },

  delete() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: "http://localhost:3000/api/backlog/delete",
            data: {
              "_id": that.data.backlog._id
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            responseType: 'text',

            success() {
              wx.hideLoading()
              wx.request({
                url: "http://localhost:3000/api/reminder/delete",
                data: {
                  "_id": that.data.backlog.reminderID
                },
                header: {
                  'content-type': 'application/json'
                },
                method: 'POST',
                responseType: 'text',
                success(){
                  console.log("删除成功")
                  wx.navigateBack()
                }})

            },
            fail() {
              wx.hideLoading()
              console.log("未能连上服务器数据库")
              return
            }
          })
        } 
      }
    })

  },

  inputForm(data: { detail: { value: { title: string } } }) {
    if (data.detail.value.title == 'null') {
      wx.showToast({
        title: '标题为空',
        icon: 'error',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: "上传中"
    }),
    this.setData({
      "backlog.title":data.detail.value.title
    })
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
          console.log("修改成功")
          wx.navigateBack()
        },
        fail() {
          wx.hideLoading()
          console.log("未能连上服务器数据库")
          return
        }
      })
  }
})