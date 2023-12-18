import {Announcement} from '../../../dataStructure/dataStructure';

Page({
  onLoad: function (options: { id: any }){//这里查信息也是要用post，因为你传入的也有！！！
    console.log(options.id);
    var that=this;
    wx.request({
      url: "http://localhost:3000/api/announcement/get-specific-announcement",
      data: {
        "_id": options.id,
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',

      success(res) {
        console.log("信息获取成功")
        that.setData({
          announcement: res.data as Announcement,
        })
        return
      },
    })
  },
});