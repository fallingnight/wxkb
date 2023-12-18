import {Reminder} from '../../dataStructure/dataStructure';
var app = getApp()
Component({
  lifetimes:{
    detached(){
      var that=this;
      var status=this.data.status?1:0;
      this.setData({
        'reminder.status':status,
        'reminder.eventTime':this.data.eventDate+" "+this.data.eventTime,
        'reminder.reminderTime':this.data.reminderDate+" "+this.data.time,
      })
  
      wx.request({
        url: "http://localhost:3000/api/reminder/edit",
        data: that.data.reminder,
        header: {
          'content-type': 'application/json'
        },
        method: 'POST',
        responseType: 'text',
        success() {
          console.log('提醒修改成功')}});
    },
  },
  pageLifetimes: {
    show() {
      var that=this
      this.setData({
        didILogin: app.globalData.didILogin
      })
      wx.reLaunch({
        url: '/miniprogram/components/editReminder/editReminder'
      })

    },


  },

  properties: {
    reminderID:{
      type: String
    }
  },
  
  data: {
    didILogin:app.globalData.didILogin,
    status:false,
    reminder:{}as Reminder,
    eventDate :'',
    eventTime :'',
    reminderDate: '',
    time: '',
  },
 
  methods: {
    changeStatus(){
      var that= this
      this.setData({
        status: !this.data.status,
      });
      if(this.data.status){
        console.log(this.properties.reminderID)
      wx.request({
        url: `http://localhost:3000/api/reminder/get-specific-reminder`,
        method: 'POST',
        header: {
          'content-type': 'application/json'
        },
        data: {
          _id: that.properties.reminderID
        },
        success(res) {
          that.setData({
            reminder : (res.data as Reminder)[0]
          })
          console.log(res.data)
          const fulleventTime=that.data.reminder.eventTime;
          const fullreminderTime=that.data.reminder.reminderTime;
          that.setData({
            eventDate :fulleventTime.split(' ')[0],
            eventTime :fulleventTime.split(' ')[1],
            reminderDate: fullreminderTime.split(' ')[0],
            time: fullreminderTime.split(' ')[1],

          })
          
        },
        fail(error) {
          console.error(`获取信息失败:`, error);
        }
      });}
    },
    bindReminderDateChange: function (e: { detail: { value: any } }) {
      this.setData({
        reminderDate: e.detail.value
      })
    },
    bindReminderTimeChange(e: { detail: { value: any; }; }){
      this.setData({ time: e.detail.value });
    },
    bindEventDateChange: function (e: { detail: { value: any } }) {
      this.setData({
        eventDate: e.detail.value
      })
    },
    bindEventTimeChange: function (e: { detail: { value: any } }) {
      this.setData({
        eventTime: e.detail.value
      })
    },},
  })
