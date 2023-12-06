const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/classMG", {

})
    .then(() => {
        console.log("数据库连接成功！")
    })
    .catch((err) => {
        console.log("数据库连接失败！", err);
    })

//注意，mongoDB会为每张表自动添加一个_id字段

//这个表的增删查改已经写好了不需要动
const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    password: { type: String },
    admin: { type: Boolean },
    accountStatus: { type: Number }
})

const CourseTableSchema = new mongoose.Schema({
    username: { type: String }, //需要用username查询他的所有课程表
})

const CourseGroupSchema = new mongoose.Schema({
    username: { type: String }, //需要用username查询他的所有课程组
    groupname: { type: String }, //，需要模糊搜索课程组名->显示队应的课程
})

const CourseSchema = new mongoose.Schema({
    _courseTableID: { type: String }, //需要添加一个通过courseTableID查询课程的方法
    _coursedataID: { type: String }, //用于与课程数据关联，不需要参与检索
    username: { type: String }, //已存在通过username查询课程的方法

    //以上字段不可修改，以下字段需要能够被增加/修改，没写模糊的就需要精确检索

    courseName: { type: String }, //模糊搜索
    whichDay: { type: Number },
    startTime: { type: String },
    endTime: { type: String },
    startWeek: { type: String },
    endWeek: { type: String },
    weekInfo: { type: String },  //全周/单周/双周，不需要参与检索
    teacher: { type: String }, //模糊搜索
    place: { type: String }, //模糊搜索
    group: { type: String }, //课程组表的_id
    color: { type: String }, //不需要参与检索
    reminderID: { type: String } //不需要参与检索
})


//注意！这是管理员操作的课程数据，和课程不一样！
const CoursedataSchema = new mongoose.Schema({
    courseName: { type: String }, //模糊搜索
    whichDay: { type: Number },
    startTime: { type: String },
    endTime: { type: String },
    startWeek: { type: String },
    endWeek: { type: String },
    weekInfo: { type: String },  //全周/单周/双周，不需要参与检索
    teacher: { type: String }, //模糊搜索
    place: { type: String }, //模糊搜索
    schoolID: { type: String } //学校表的_id
})

const SchoolSchema = new mongoose.Schema({
    schoolName: { type: String }, //类似于课程组表，需要模糊搜索学校名
})

const BacklogSchema = new mongoose.Schema({
    username: { type: String },
    title: { type: String },
    content: { type: String },
    createTime: { type: String },
    reminderID: { type: String } //提醒表的_id
})

//此表只需要根据ID检索
const ReminderSchema = new mongoose.Schema({
    status: { type: Number }, //开启或关闭
    eventTime: { type: String }, //事件时间
    reminderTime: { type: String }, //提醒时间，因为需要提前提醒
})


//此表的增删查改已经写好了不需要动
const AnnouncementSchema = new mongoose.Schema({
    username: { type: String },
    createTime: { type: String },
    lastEditTime: { type: String },
    title: { type: String },
    content: { type: String }
})
const User = mongoose.model('User', UserSchema)
const Course = mongoose.model('Course', CourseSchema)
const Backlog = mongoose.model('Backlog', BacklogSchema)
const Announcement = mongoose.model('Announcement', AnnouncementSchema)
const CourseTable = mongoose.model('CourseTable', CourseTableSchema)
const CourseGroup = mongoose.model('CourseGroup', CourseGroupSchema)
const Coursedata = mongoose.model('Coursedata', CoursedataSchema)
const School = mongoose.model('School', SchoolSchema)
const Reminder = mongoose.model('Reminder', ReminderSchema)


module.exports = {
    User,
    CourseTable,
    CourseGroup,
    Course,
    Coursedata,
    School,
    Reminder,
    Backlog,
    Announcement
}
