import {Backlog,Reminder} from '../../dataStructure/dataStructure';
import { parseDateString} from '../../utils/util';
var app = getApp();

Component({
  pageLifetimes: {
    show() {
      if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 2
        });
      }

      var that = this;
      wx.request({
         url: "http://localhost:3000/api/backlog/get-all-backlogs",
         header: {
           'content-type': 'application/json'
           },
           data: {
            "username": app.globalData.usernameDisplay
          },
           method: 'POST',
           responseType: 'text',

         success(res) {
             console.log("信息获取成功")
             const bklist=res.data as Backlog[];
             const rdlist:Reminder[]=[];
             const stlist: any[] = [];
             bklist.forEach(async (backlog, index) => {
              const reminderID = backlog.reminderID;
              // 发送请求获取reminder表中的详细信息
              wx.request({
                url: `http://localhost:3000/api/reminder/get-specific-reminder`,
                method: 'POST',
                header: {
                  'content-type': 'application/json'
                },
                data: {
                  _id: reminderID
                },
                success(res) {
                  rdlist[index] = (res.data as Reminder)[0];
                  const status=rdlist[index].status;
                  const reminderTime=rdlist[index].reminderTime;
                    // 根据条件标记元素
                    if (status === 0) {
                      stlist[index] = 0;
                    } else if (parseDateString(reminderTime).getTime() < new Date().getTime()) {
                      stlist[index] = 1;
                    } else {
                      stlist[index] = 2;
                    }
                  // 如果所有元素都被处理完毕，可以在这里更新界面或执行其他操作
                  if (index === bklist.length - 1) {
                    that.setData({
                      remindStatusList: stlist,
                      reminderList:rdlist
                       })
                  }
                },
                fail(error) {
                  console.error(`获取备忘录 ${reminderID} 的详细信息失败:`, error);
                }
              });
            });
             that.setData({
              backlogList: res.data as Backlog[]
               })

             
   }
 })}
},

  data: {
    didILogin: app.globalData.didILogin,
    usernameDisplay: app.globalData.usernameDisplay,
    showMore: false,
    backlogList: [] as Backlog[],
    remindStatusList:[] as number[],
    reminderList:[] as Reminder[],
  },
  methods: {
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
    }
  }
});