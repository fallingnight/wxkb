<<<<<<< HEAD
import {Backlog,Reminder} from '../../dataStructure/dataStructure';
import { parseDateString} from '../../utils/util';
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
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
<<<<<<< HEAD
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
=======

      wx.request({
        url: "http://localhost:3000/api/backlog/get-all-backlogs",
        header: {
          'content-type': 'application/json'
        },
        data: {
          username: app.globalData.usernameDisplay
        },
        method: 'POST',
        success(res) {
          console.log("信息获取成功");

          that.setData({
            list: res.data
          }, function () {
            // setData 完成后的回调函数

            for (let i = 0; i < that.data.list.length; i++) {
              if (that.data.list[i].reminderOrNot == true) {
                const shouldRemind = xxxB(that.data.list[i].reminderTime);
                if (!shouldRemind) {
                  var key = `list[${i}].shouldIRemind`;
                  that.setData({
                    [key]: true
                  }, function () {
                  });
                }
              }
            }
          });
        },
      });
    }
  },
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00

  data: {
    didILogin: app.globalData.didILogin,
    usernameDisplay: app.globalData.usernameDisplay,
    showMore: false,
<<<<<<< HEAD
    backlogList: [] as Backlog[],
    remindStatusList:[] as number[],
    reminderList:[] as Reminder[],
  },
  methods: {
=======
  },
  methods:{
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
    toggleMore() {
      this.setData({
        showMore: !this.data.showMore,
      });
<<<<<<< HEAD
    }
  }
});
=======
    },
  }
});

function extractDateB(dateString: string | undefined): { yyyy: number; mm: number; dd: number } {
  if (!dateString || typeof dateString !== 'string') {
    // 如果 dateString 不是有效的字符串，返回一个默认值或者抛出错误，具体根据业务需求决定
    console.error("Invalid dateString:", dateString);
    return { yyyy: 0, mm: 0, dd: 0 };
  }

  const [, yyyyStr, mmStr, ddStr] = dateString.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/) || [];

  // 使用 "+" 运算符将字符串转换为数字
  const yyyy = +yyyyStr;
  const mm = +mmStr;
  const dd = +ddStr;

  return { yyyy, mm, dd };
}


function xxxB(reminderTime: string) {
  const currentDate = extractDateB(reminderTime); // 获取 reminderTime 的年月日信息
  var myDate = new Date();
  var year = myDate.getFullYear(); // 获取当前年
  var mon = myDate.getMonth() + 1; // 获取当前月
  var date = myDate.getDate(); // 获取当前日

  // 判断 reminderTime 是否在今天之后
  return (
    currentDate.yyyy > year ||
    (currentDate.yyyy === year && currentDate.mm > mon) ||
    (currentDate.yyyy === year && currentDate.mm === mon && currentDate.dd > date)
  );
}
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
