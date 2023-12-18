<<<<<<< HEAD
import { Course, Coursedata, CourseGroup, Reminder } from '../../../dataStructure/dataStructure';
import { rgb2hex,hex2rgb } from '../../../utils/util';

var app = getApp();
const brightColors = [
  'rgb(255, 87, 51)', 'rgb(255, 215, 0)', 'rgb(199, 21, 133)', 'rgb(32, 178, 170)',
  'rgb(186, 85, 211)', 'rgb(50, 205, 50)', 'rgb(65, 105, 225)',
  'rgb(255, 99, 71)', 'rgb(138, 43, 226)', 'rgb(0, 255, 127)', 'rgb(255, 140, 0)',
  'rgb(139, 0, 139)', 'rgb(0, 250, 154)', 'rgb(30, 144, 255)'
  // 随机列表
];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    whichDayArray: ['一', '二', '三', '四', '五', '六', '日'],
    whichDayIndex: 0,

    startTimeArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    startTimeIndex: 0,
    endTimeArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    endTimeIndex: 1,

    startWeekArray: [1],
    startWeekIndex: 0,

    endWeekArray: [1],
    endWeekIndex: 15,

    weekInfoArray: ['单周', '双周', '全周'],
    weekInfoIndex: 2,
    groupIndex:0,
    color: '',
    pick: false,
    coursedataStr:'',
    newCourse: {
      _courseTableID: '',
      _coursedataID: '',
      username: app.globalData.usernameDisplay,
      courseName: '',
      whichDay: 0,
      startTime: '0',
      endTime: '1',
      startWeek: '0',
      endWeek: '15',
      weekInfo: '全周',
      teacher: '',
      place: '',
      group: '',
      color: '',
      reminderID:''
    } as Course,
    reminder:{
      status: 0,
      eventTime: '',
      reminderTime: '',
      _id: '',
    }as Reminder,
    groupList:[] as CourseGroup[],
  },
  placeInputAction: function (options: { detail: any }) {
    this.data.newCourse.place = options.detail.value
  },
  teacherInputAction: function (options: { detail: any }) {
    this.data.newCourse.teacher = options.detail.value
  },
  courseNameInputAction: function (options: { detail: any }) {
    this.data.newCourse.courseName = options.detail.value
  },
  bindDayChange: function (e: { detail: { value: any } }) {
    this.data.newCourse.whichDay = parseInt(e.detail.value);
    this.setData({
      whichDayIndex: parseInt(e.detail.value)
=======
import { Course } from '../../../dataStructure/dataStructure';
import { hex2rgb, rgb2hex } from '../../../utils/util';
var app = getApp();

Page({
  data: {
    _id: String,
    courseName: { type: String, value: "null" },
    teacher: { type: String },
    dayArray: ['一', '二', '三', '四', '五', '六', '日'],
    groupArray: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
    timeArray: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    color: '' as string,
    pick: false,
    dayObjectArray: [
      {
        id: 0,
        name: '一'
      },
      {
        id: 1,
        name: '二'
      },
      {
        id: 2,
        name: '三'
      },
      {
        id: 3,
        name: '四'
      },
      {
        id: 4,
        name: '五'
      },
      {
        id: 5,
        name: '六'
      },
      {
        id: 6,
        name: '日'
      },
    ],
    dayIndex: 0,
    groupIndex: 0,
    startTime: '6',
    endTime: '7'
  },
  bindPickerChange: function (e: { detail: { value: any } }) {
    this.setData({
      dayIndex: e.detail.value
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    })
  },
  bindStartTimeChange: function (e: { detail: { value: any } }) {
    this.setData({
<<<<<<< HEAD
      startTimeIndex: e.detail.value,
      'newCourse.startTime':e.detail.value,
=======
      startTime: e.detail.value
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    })
  },
  bindEndTimeChange: function (e: { detail: { value: any } }) {
    this.setData({
<<<<<<< HEAD
      endTimeIndex: e.detail.value,
      'newCourse.endTime':e.detail.value,
    })
  },
  bindWeekInfoChange: function (e: { detail: { value: any } }) {
    this.setData({
      weekInfoIndex: e.detail.value,
    })
    this.data.newCourse.weekInfo = this.data.weekInfoArray[this.data.weekInfoIndex];
  },
  bindStartWeekChange: function (e: { detail: { value: any } }) {
    this.setData({
      startWeekIndex: e.detail.value,
      'newCourse.startWeek':e.detail.value,
    })
  },
  bindEndWeekChange: function (e: { detail: { value: any } }) {
    this.setData({
      endWeekIndex: e.detail.value,
      'newCourse.endWeek':e.detail.value,
=======
      endTime: e.detail.value
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    })
  },
  bindGroupChange: function (e: { detail: { value: any } }) {
    this.setData({
      groupIndex: e.detail.value
    })
  },
  pickColor: function (e: { detail: { color: any; }; }) {
<<<<<<< HEAD
=======
    console.log("1")
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    this.setData({
      color: e.detail.color
    })
  },
  toPick: function () {
<<<<<<< HEAD
    this.setData({
      pick: true
    })
  },
  getStartTimeArray() {
    var timeArray = []
    for (var i = 1; i <= 20; i++) {
      var time = i
      timeArray.push(time);
    }
    this.setData({
      startWeekArray: timeArray,
      endWeekArray: timeArray
    })
  },
  getCourseGroups(){
    var that = this;
    wx.request({
      url: "http://localhost:3000/api/courseGroup/get-courseGroup",
      data: {
        "username": app.globalData.usernameDisplay
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success(res) {
        console.log("获取课程组成功")
        that.setData({
          groupList:res.data as CourseGroup[]
        });
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
        return;
      }});

  },
  editCourse(){
    var that = this;
    console.log(app.globalData.usernameDisplay);
    this.setData({
        "newCourse.color":rgb2hex(this.data.color),
        "newCourse.group":this.data.groupList[this.data.groupIndex]._id
    });
    if(this.data.newCourse.courseName == '') {
      wx.showToast({
        title: '课程名不能为空',
        icon: 'error'
      })
      return;
    }
    if (parseInt(this.data.newCourse.startTime) > parseInt(this.data.newCourse.endTime)||parseInt(this.data.newCourse.startWeek) > parseInt(this.data.newCourse.endWeek)) {
=======
    console.log("2")
    this.setData({
      pick: true
    })
    console.log(this.data.pick)
  },
  inputForm(data: { detail: { value: { courseName: string; teacher: any; }; }; }) {
    if (data.detail.value.courseName == 'null') {
      wx.showToast({
        title: '课程名为空',
        icon: 'error',
        duration: 1000
      })
      return
    }
    if (this.data.startTime > this.data.endTime) {
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
      wx.showToast({
        title: '时间设置错误',
        icon: 'error',
        duration: 1000
      })
      return
    }
    wx.showLoading({
<<<<<<< HEAD
      title: "添加中"
    });
        wx.request({
        url: "http://localhost:3000/api/course/edit",
        data: that.data.newCourse,
        header: {
        'content-type': 'application/json'
        },
        method: 'POST',
        responseType: 'text',

        success(res) {
        wx.hideLoading()
        console.log("添加成功")
        console.log(res)
        wx.navigateBack();
        return
        },
        fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
        }})
  },
  delete() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: "http://localhost:3000/api/course/delete",
            data: {
              "_id": that.data.newCourse._id
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
                  "_id": that.data.newCourse.reminderID
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options: { id: any }){
    this.getStartTimeArray();
    this.getCourseGroups();
    var that = this
=======
      title: "上传中"
    })
    wx.request({
      url: "http://localhost:3000/api/course/edit",
      data: {
        "_id": this.data._id,
        "username": app.globalData.usernameDisplay,
        "courseName": data.detail.value.courseName,
        "whichDay": this.data.dayIndex,
        "startTime": this.data.startTime,
        "endTime": this.data.endTime,
        "teacher": data.detail.value.teacher,
        "group": this.data.groupIndex,
        "color": rgb2hex(this.data.color)
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success() {
        wx.hideLoading()
        console.log("添加成功")
        wx.navigateBack()
        return
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    })
  },

  onLoad: function (options: { id: any }) {
    var that = this
    this.data._id = options.id
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    wx.request({
      url: "http://localhost:3000/api/course/get-specific-course",
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
                    newCourse:res.data[0]})
        const id=that.data.newCourse.group;
        that.setData({
          color:hex2rgb(that.data.newCourse.color),
          whichDayIndex: that.data.newCourse.whichDay,
          startTimeIndex:parseInt(that.data.newCourse.startTime),
          endTimeIndex:parseInt(that.data.newCourse.endTime),
          startWeekIndex:parseInt(that.data.newCourse.startWeek),
          endWeekIndex: parseInt(that.data.newCourse.endWeek),
          weekInfoIndex:that.data.weekInfoArray.indexOf(that.data.newCourse.weekInfo),
          groupIndex:that.data.groupList.indexOf(that.data.groupList.find(item => item._id === id) as CourseGroup),
        })
        }})
      
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    /*
    this.setData({
      color:brightColors[Math.floor(Math.random() * brightColors.length)]
    });
    */
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
=======
          groupIndex: (res.data as Course[])[0].group,
          _res: res.data,
          dayIndex: (res.data as Course[])[0].whichDay,
          startTime: (res.data as Course[])[0].startTime,
          endTime: (res.data as Course[])[0].endTime,
        })
        const rgbColor = hex2rgb((res.data as Course[])[0].color);
        if (rgbColor !== null) {
          that.setData({
            color: rgbColor
          })
        } else {
          this.data.color = 'rgb(255,255,255)';
        }
      }
    })
  },

  delete() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: "http://localhost:3000/api/course/delete",
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
              wx.switchTab({
                url: '../../index/index'
              })
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
})
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
