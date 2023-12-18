<<<<<<< HEAD
import {getNowFullTime} from '../../../utils/util';
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
Page({
  data: {
    _id: String,
    title: 'null',
    content: String,
  },

  onLoad: function (options: { id: any }) {
    var that = this
    this.data._id = options.id
    wx.request({
      url: "http://localhost:3000/api/announcement/get-specific-announcement",
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
          _res: res.data
        })
      }
    })

  },

<<<<<<< HEAD
=======
  getNowDate() {
    var myDate = new Date;
    var year = myDate.getFullYear(); //获取当前年
    var mon = myDate.getMonth() + 1; //获取当前月
    var date = myDate.getDate(); //获取当前日
    var hours = myDate.getHours(); //获取当前小时
    var minutes = myDate.getMinutes(); //获取当前分钟
    var seconds = myDate.getSeconds(); //获取当前秒
    var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
    return now;
  },
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00

  getContent(e: { detail: { value: StringConstructor } }) {
    this.data.content = e.detail.value
  },

  delete() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: "http://localhost:3000/api/announcement/delete",
            data: {
              "_id": that.data._id
            },
            header: {
              'content-type': 'application/json'
            },
            method: 'POST',
            responseType: 'text',

            success() {
              wx.hideLoading()
              console.log("删除成功")
              wx.navigateBack()
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
<<<<<<< HEAD
    console.log(this.data._id, getNowFullTime(), data.detail.value.title, this.data.content)
=======
    console.log(this.data._id, this.getNowDate(), data.detail.value.title, this.data.content)
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    if (data.detail.value.title == 'null') {
      wx.showToast({
        title: '课程名为空',
        icon: 'error',
        duration: 1000
      })
      return
    }
    wx.showLoading({
      title: "上传中"
    }),
      wx.request({
        url: "http://localhost:3000/api/announcement/edit",
        data: {
          "_id": this.data._id,
<<<<<<< HEAD
          "createTime": getNowFullTime(),
=======
          "createTime": this.getNowDate(),
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
          "title": data.detail.value.title,
          "content": this.data.content
        },
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