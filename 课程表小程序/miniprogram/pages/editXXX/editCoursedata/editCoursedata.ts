<<<<<<< HEAD
import {Coursedata} from '../../../dataStructure/dataStructure'; 

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageTitle: '修改课程',
    showWhichDay: false,
    whichDayArray: ['一', '二', '三', '四', '五', '六', '日'],
    whichDayIndex: 0,

    startTimeArray:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    startTimeIndex: 0,

    endTimeArray:['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    endTimeIndex: 1,

    startWeekArray: [1],
    startWeekIndex: 0,

    endWeekArray: [1],
    endWeekIndex: 15,

    weekInfoArray: ['单周', '双周','全周'],
    weekInfoIndex: 2,
    schoolName:'',

    newCourse: {
      _id: '',
      courseName: '',
      whichDay: 0,
      startTime: '0',
      endTime: '1',
      startWeek: '0',
      endWeek: '15',
      weekInfo: '全周',
      teacher: '',
      place: '',
      schoolID: ''
    } as Coursedata,

  },
  


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options: {id:string}) {
    this.getStartTimeArray();
    var that = this
    wx.request({
      url: "http://localhost:3000/admin/get-specific-course",
      data: {
        "_id": options.id
=======
import {Course} from '../../../dataStructure/dataStructure'
var app = getApp()
Page({
  data: {
    whichDay: ['一','二','三','四','五','六','日'],
    courseList: [] as Course[],
  },

  onLoad: function (options: { id: any }){//这里查信息也是要用post，因为你传入的也有！！！
    var that=this;
    wx.request({
      url: "http://localhost:3000/api/course/get-specific-course",
      data: {
        "_id": options.id,
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
      },
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
<<<<<<< HEAD
      responseType: 'text',

      success: res => {
        that.setData({
          newCourse: (res.data as Coursedata)[0]
        });
        that.setData({
          whichDayIndex:that.data.newCourse.whichDay,
          startTimeIndex:parseInt(that.data.newCourse.startTime),
          endTimeIndex:parseInt(that.data.newCourse.endTime),
          startWeekIndex:parseInt(that.data.newCourse.startWeek),
          endWeekIndex:parseInt(that.data.newCourse.endWeek)
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
=======

      success(res) {
        console.log("信息获取成功")
        that.setData({
          courseList: res.data as Course[],
        })
        return
      },
    })
  },
  editThis(e: { currentTarget: { dataset: { item: any } } }) {
    const id = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: "../editXXX/editCoursedata/editInput?id=" + id,
    })
  },

>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  onReady() {

  },

<<<<<<< HEAD
  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
=======

  onShow() {
    this.onLoad()
  },

>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  onHide() {

  },

<<<<<<< HEAD
  /**
   * 生命周期函数--监听页面卸载
   */
=======

>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  onUnload() {

  },

<<<<<<< HEAD
  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
=======

>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  onPullDownRefresh() {

  },

<<<<<<< HEAD
  /**
   * 页面上拉触底事件的处理函数
   */
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  onReachBottom() {

  },

<<<<<<< HEAD
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },
  bindWhichDayChange(e: {detail: {value: '1'}}) {
    this.data.newCourse.whichDay = parseInt(e.detail.value);
    this.setData({
      whichDayIndex: parseInt(e.detail.value)
    })
  },
  getStartTimeArray() {
      var timeArray = []
      for(var i = 1; i <= 20; i++) {
        var time=i
        timeArray.push(time);
      }
      this.setData({
        startWeekArray: timeArray,
        endWeekArray:timeArray
      })
  },
  bindStartTimeChange(e: {detail: {value: '1'}}) {
    this.setData({
      startTimeIndex: parseInt(e.detail.value)
    })
    this.data.newCourse.startTime =  String(this.data.startTimeIndex);
  },

  bindCourseNameInput(e: {detail: {value: ''}}) {
    this.data.newCourse.courseName = e.detail.value;
  },
  bindTeacherNameInput(e: {detail: {value: ''}}) {
    this.data.newCourse.teacher = e.detail.value;
  },
  bindPlaceInput(e: {detail: {value: ''}}) {
    this.data.newCourse.place = e.detail.value;
  },
  bindSchoolIDInput(e: {detail: {value: ''}}) {
    this.data.newCourse.schoolID = e.detail.value;
  },
  bindEndTimeChange(e: {detail: {value: '0'}}) {
    this.setData({
      endTimeIndex: parseInt(e.detail.value)
    })
    this.data.newCourse.endTime = String(this.data.endTimeIndex);
  },
  bindStartWeekChange(e: {detail: {value: '0'}}) {
    this.setData({
      startWeekIndex: parseInt(e.detail.value)
    })
    this.data.newCourse.startWeek = String(this.data.startWeekIndex);
  },
  bindEndWeekChange(e: {detail: {value: '0'}}) {
    this.setData({
      endWeekIndex: parseInt(e.detail.value)
    })
    this.data.newCourse.endWeek = String(this.data.endWeekIndex);
  },
  bindWeekInfoChange(e: {detail: {value: '0'}}) {
    this.setData({
      weekInfoIndex: parseInt(e.detail.value)
    })
    this.data.newCourse.weekInfo = this.data.weekInfoArray[this.data.weekInfoIndex];
  },
  editCourse() {
    console.log('修改课程')
    console.log(this.data.newCourse.courseName);
    var errorMessage = '';
    if(this.data.newCourse.courseName == '') {
      errorMessage = '课程名称不能为空';
    }else if(this.data.newCourse.teacher == '') {
      errorMessage = '教师名称不能为空';
    }else if(this.data.newCourse.place == '') {
      errorMessage = '上课地点不能为空';
    }else if(this.data.newCourse.schoolID == '') {
      errorMessage = '学校名称不能为空';
    }
    if(errorMessage != '') {
      wx.showToast({
        title: errorMessage,
        icon: 'error'
      })
      return;
    }
    var that=this;
    wx.showLoading({
      title: "添加中"
    });
    wx.request({
      url: "http://localhost:3000/admin/edit-course",
      data: that.data.newCourse,
      header: {
        'content-type': 'application/json'
      },
      method: 'POST',
      responseType: 'text',

      success(res) {
        wx.hideLoading()
        console.log("修改成功");
        wx.navigateBack();
        return
      },
      fail() {
        wx.hideLoading()
        console.log("未能连上服务器数据库")
      }
    });

  },
  deleteCourse() {
    let that = this
    wx.showModal({
      title: '提示',
      content: '确认删除？',
      success(res) {
        if (res.confirm) {
          wx.request({
            url: "http://localhost:3000/admin/delete-course",
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

=======

  onShareAppMessage() {

>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  }
})