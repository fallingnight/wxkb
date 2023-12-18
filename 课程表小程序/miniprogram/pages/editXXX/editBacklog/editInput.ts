<<<<<<< HEAD
import {Backlog} from '../../../dataStructure/dataStructure';
Page({
  data: {
    backlog:{} as Backlog,
=======
Page({
  data: {
    _id: String,
    title: 'null',
    content: String,
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  },

  onLoad: function (options: { id: any }) {
    var that = this
<<<<<<< HEAD
=======
    this.data._id = options.id
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
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
<<<<<<< HEAD
          backlog: (res.data as Backlog)[0]
=======
          _res: res.data
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
        })
      }
    })

  },

<<<<<<< HEAD
  getContent(e: { detail: { value: string } }) {
    this.data.backlog.content = e.detail.value
=======
  getContent(e: { detail: { value: StringConstructor } }) {
    this.data.content = e.detail.value
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
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
<<<<<<< HEAD
              "_id": that.data.backlog._id
=======
              "_id": that.data._id
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            responseType: 'text',

            success() {
              wx.hideLoading()
<<<<<<< HEAD
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

=======
              console.log("删除成功")
              wx.navigateBack()
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
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
<<<<<<< HEAD
    this.setData({
      "backlog.title":data.detail.value.title
    })
      wx.request({
        url: "http://localhost:3000/api/backlog/edit",
        data: this.data.backlog,
=======
      wx.request({
        url: "http://localhost:3000/api/backlog/edit",
        data: {
          "_id": this.data._id,
          "title": data.detail.value.title,
          "content": this.data.content
        },
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
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