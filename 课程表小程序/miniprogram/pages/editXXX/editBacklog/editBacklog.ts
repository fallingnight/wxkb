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
                const shouldRemind = xxx(that.data.list[i].reminderTime);
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

  data: {
    didILogin: app.globalData.didILogin,
    usernameDisplay: app.globalData.usernameDisplay
  },
  methods:{
    editThis(e: { currentTarget: { dataset: { item: any } } }) {
      const id = e.currentTarget.dataset.item;
      wx.navigateTo({
        url: "editInput?id=" + id,
      })
    }
  }
});

function extractDate(dateString: string | undefined): { yyyy: number; mm: number; dd: number } {
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


function xxx(reminderTime: string) {
  const currentDate = extractDate(reminderTime); // 获取 reminderTime 的年月日信息
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

