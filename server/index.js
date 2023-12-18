<<<<<<< HEAD
const ObjectId = require('mongodb').ObjectId;
const MAX_LENGTH=5;
//package.json里有写启动命令让nodemon自动启动
const express = require('express');
const { User, Course, Backlog, Announcement, CourseTable, CourseGroup, School, Coursedata, Reminder } = require('./db');
const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log('server running!');
})

app.get("/hello", (req, res) => {
    res.send("success");
})


//查询目前的所有表👇
app.get("/api/users", async (req, res) => {
    const users = await User.find()
    res.send(users);
})

app.get("/api/courses", async (req, res) => {
    const courses = await Course.find()
    res.send(courses);
})

app.get("/admin/courses", async (req, res) => {
    const coursedata = await Coursedata.find();
    res.send(coursedata);
})

app.get("/api/backlogs", async (req, res) => {
    const backlogs = await Backlog.find()
    res.send(backlogs);
})

app.get("/api/announcements", async (req, res) => {
    const announcements = await Announcement.find()
    res.send(announcements);
})

//POST API👇
app.post("/api/register", async (req, res) => { //管理员权限是调用api来赋予的，不是在注册时给的数据
    const userFind = await User.findOne({
        username: req.body.username
    })

    if (!userFind) {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            accountStatus: req.body.accountStatus
        })
        res.send(user);
    }
    else {
        return res.status(422).send({
            message: "账号名已存在"
        })
    }
})

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: "用户名不存在"
        })
    }
    if (!(req.body.password == user.password)) {
        return res.status(422).send({
            message: "密码错误"
        })
    }
    res.send(user)
})

app.post("/api/me/set-status", async (req, res) => {
    let username = {
        username: req.body.username
    }
    let updateInfo = {
        accountStatus: req.body.accountStatus
    }
    console.log(req.body.username)
    console.log(req.body.accountStatus)
    await User.updateOne(
        username,
        updateInfo
    )
    res.send("")
})

app.post("/api/me/get-status", async (req, res) => {
    const userFind = await User.findOne({
        username: req.body.username
    })
    console.log(req.body.username)
    console.log(req.body.accountStatus)
    res.send(userFind)
})

app.post("/api/course/new", async (req, res) => {
    const course = await Course.create({
        _courseTableID: req.body._courseTableID,
        _coursedataID:req.body._coursedataID,
        username:req.body.username,
        courseName: req.body.courseName,
        whichDay: req.body.whichDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        startWeek: req.body.startWeek,
        endWeek: req.body.endWeek,
        weekInfo: req.body.weekInfo,
        teacher: req.body.teacher,
        place: req.body.place,
        group: req.body.group,
        color: req.body.color,
        reminderID:req.body.reminderID
    })
    res.send(course);
})

app.post("/api/course/get-all-courses", async (req, res) => {
    const courses = await Course.find({
        username: req.body.username
    })
    if (!courses) {
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    console.log(courses)
    res.send(courses);
})

app.post("/api/course/get-table-courses", async (req, res) => {
    const courses = await Course.find({
        username: req.body.username,
        _courseTableID: req.body._courseTableID
    })
    if (!courses) {
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    console.log(courses)
    res.send(courses);
})

app.post("/api/course/search", async (req, res) => {
    const course = await Course.findOne({
        username: req.body.username,
        courseName: req.body.courseName
    })
    if (!course) {
        console.log(req.body.username, req.body.courseName)
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    else {
        res.send(course)
    }
})

app.post("/api/course/get-specific-course", async (req, res) => {
    const course = await Course.find({
        _id: req.body._id
    })
    res.send(course);
})

app.post("/api/course/old-edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        username: req.body.username,
        courseName: req.body.courseName,
        whichDay: req.body.whichDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        teacher: req.body.teacher,
        group: req.body.group,
        color: req.body.color,
    }
    console.log(req.body._id)

    await Course.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

app.post("/api/course/delete", async (req, res) => {
    await Course.deleteOne({
        _id: req.body._id
    })
    res.send("");
})

app.post("/api/announcement/get-specific-announcement", async (req, res) => {
    const announcement = await Announcement.find({
        _id: req.body._id
    })
    res.send(announcement);
})

app.post("/api/announcement/delete", async (req, res) => {
    await Announcement.deleteOne({
        _id: req.body._id
    })
    res.send("");
})

app.post("/api/announcement/new", async (req, res) => {
    const announcements = await Announcement.find()
    if(announcements.length>=5){
        res.status(404).send({
            message: "课程表非空!"
        })
        return

    }else{
    const announcement = await Announcement.create({
        username: req.body.username,
        createTime: req.body.createTime,
        lastEditTime: req.body.createTime,
        content: req.body.content,
        title: req.body.title
    })
    res.send(announcement);
}

})

//////////////////////
app.post("/api/announcement/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        lastEditTime: req.body.createTime,
        content: req.body.content,
        title: req.body.title
    }
    console.log(req.body._id)

    await Announcement.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

app.post("/api/backlog/new", async (req, res) => {
    const backlog = await Backlog.create({
        username: req.body.username,
        createTime: req.body.createTime,
        title: req.body.title,
        content: req.body.content,
        reminderID: req.body.reminderID
    })
    res.send(backlog);
})

app.post("/api/backlog/get-all-backlogs", async (req, res) => {
    const backlogs = await Backlog.find({
        username: req.body.username
    })
    if (!backlogs) {
        console.log("无备忘事项")
        res.status(404).send({
            message: "找不到备忘事项"
        })
        return
    }
    console.log(backlogs)
    res.send(backlogs);
})

app.post("/api/backlog/get-specific-backlog", async (req, res) => {
    const backlog = await Backlog.find({
        _id: req.body._id
    })
    res.send(backlog);
})

app.post("/api/backlog/delete", async (req, res) => {
    await Backlog.deleteOne({
        _id: req.body._id
    })
    res.send("");
})

app.post("/api/backlog/old-edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        title: req.body.title,
        content: req.body.content,
    }

    await Backlog.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

app.post("/admin/set", async (req, res) => {
    let username = {
        username: req.body.username
    }
    const user = User.findOne(username)
    if (user) {
        let updateInfo = {
            admin: req.body.admin
        }
        await User.updateOne(
            username,
            updateInfo
        )
        console.log("设置成功!")
        console.log(user)
    }
    else {
        console.log("用户不存在!")
    }
})

app.post("/admin/course-search", async (req, res) => {
    const course = await Course.find({
        courseName: req.body.courseName
    })
    if (!course) {
        console.log(req.body.courseName)
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    else {
        res.send(course)
    }
})

//新增
//创建课程表
app.post("/api/courseTable/new", async (req, res) => {
    const courseTable = await CourseTable.create({
        username: req.body.username
    })
    res.send(courseTable);
})

//根据id取得课程表
app.post("/api/courseTable/get-specific-courseTable", async (req, res) => {
    const courseTable = await CourseTable.find({
        _id: req.body._id
    })
    res.send(courseTable);
})

//删除课程表
app.post("/api/courseTable/delete", async (req, res) => {
    const course = await Course.find({
        _courseTableID: req.body._id
    })
if(course.length==0){
    await CourseTable.deleteOne({
        _id: req.body._id
    })
    res.send("");
}else{
    console.log(course);
    res.status(404).send({
        message: "课程表非空!"
    })
    return
}
})

//用username查询课程表
app.post("/api/courseTable/get-courseTable", async (req, res) => {
    const courseTable = await CourseTable.find({
        username: req.body.username
    });
    if (!courseTable) {
        console.log(req.body.username)
        console.log("无课程表")
        res.status(404).send({
            message: "找不到课程表"
        })
        return
    }
    else {
        res.send(courseTable)
    }
})

//创建课程组
app.post("/api/courseGroup/new", async (req, res) => {
    const courseGroup = await CourseGroup.create({
        username: req.body.username,
        groupname: req.body.groupname
    })
    res.send(courseGroup);
})

app.post("/api/courseGroup/init", async (req, res) => {
    const username=req.body.username;
    for (let i = 1; i <= 10; i++) {
        const groupname = `${i}`; // 使用数字作为课程组名称

        const courseGroup = await CourseGroup.create({
            username,
            groupname
        });
    }
    res.send("success");
})

//根据id取得课程组
app.post("/api/courseGroup/get-specific-courseGroup", async (req, res) => {
    const courseGroup = await CourseGroup.find({
        _id: req.body._id
    })
    res.send(courseGroup);
})


//查询课程组
app.post("/api/courseGroup/get-courseGroup", async (req, res) => {
    let queryInfo = {
    }
    if(req.body.username)
        queryInfo.username = req.body.username
    if(req.body.groupname)
        queryInfo.groupname = {$regex:req.body.groupname}

    const courseGroup = await CourseGroup.find(
        queryInfo
    );

    if (!courseGroup) {
        console.log(queryInfo)
        console.log("无课程组")
        res.status(404).send({
            message: "找不到课程组"
        })
        return
    }
    else {
        res.send(courseGroup)
    }
})

//编辑课程组
app.post("/api/courseGroup/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        groupname : req.body.groupname
    }
    console.log(req.body._id)

    await CourseGroup.updateOne(
        id,
        updateInfo
    )
    res.send("")
})
//删除课程组
app.post("/api/courseGroup/delete", async (req, res) => {
    const course = await Course.find({
        group: req.body._id
    })
if(course.length==0){
    await CourseGroup.deleteOne({
        _id: req.body._id
    })
    res.send("");
}else{
    console.log(course);
    res.status(404).send({
        message: "课程组非空!"
    })
    return

}
})

//课程
//查询课程
app.post("/api/course/get-course", async (req, res) => {
    let queryInfo = {
    }
    if(req.body._courseTableID)
        queryInfo._courseTableID = req.body._courseTableID
    if(req.body._coursedataID)
        queryInfo._coursedataID = req.body._coursedataID
    if(req.body.username)
        queryInfo.username = req.body.username
    if(req.body.courseName)
        queryInfo.courseName = {$regex:req.body.courseName}
    if(req.body.whichDay)
        queryInfo.whichDay = req.body.whichDay
    if(req.body.startTime)
        queryInfo.startTime = req.body.startTime
    if(req.body.endTime)
        queryInfo.endTime = req.body.endTime
    if(req.body.startWeek)
        queryInfo.startWeek = req.body.startWeek
    if(req.body.endWeek)
        queryInfo.endWeek = req.body.endWeek
    if(req.body.teacher)
        queryInfo.teacher = {$regex:req.body.teacher}
    if(req.body.place)
        queryInfo.place = {$regex:req.body.place}
    if(req.body.group)
        queryInfo.teacher = req.body.group

    const course = await Course.find(
        queryInfo
    );

    if (!course) {
        console.log(queryInfo)
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    else {
        res.send(course)
    }
})
//编辑课程
app.post("/api/course/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        courseName: req.body.courseName,
        whichDay: req.body.whichDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        startWeek: req.body.startWeek,
        endWeek: req.body.endWeek,
        weekInfo: req.body.weekInfo,
        teacher: req.body.teacher,
        place: req.body.place,
        group: req.body.group,
        color: req.body.color,
    }
    console.log(req.body._id)

    await Course.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

//管理员课程
//创建管理的课程数据
app.post("/admin/new-course", async (req, res) => {
    const course = await Coursedata.create({
        courseName: req.body.courseName,
        whichDay: req.body.whichDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        startWeek: req.body.startWeek,
        endWeek: req.body.endWeek,
        weekInfo: req.body.weekInfo,
        teacher: req.body.teacher,
        place: req.body.place,
        schoolID: req.body.schoolID
    })
    res.send(course);
})

//根据id取得课程数据
app.post("/admin/get-specific-course", async (req, res) => {
    const course = await Coursedata.find({
        _id: req.body._id
    })
    res.send(course);
})

//查询课程数据
app.post("/admin/get-course", async (req, res) => {
    let queryInfo = {
    }
    if(req.body.courseName)
        queryInfo.courseName = {$regex:req.body.courseName}
    if(req.body.whichDay)
        queryInfo.whichDay = req.body.whichDay
    if(req.body.startTime)
        queryInfo.startTime = req.body.startTime
    if(req.body.endTime)
        queryInfo.endTime = req.body.endTime
    if(req.body.startWeek)
        queryInfo.startWeek = req.body.startWeek
    if(req.body.endWeek)
        queryInfo.endWeek = req.body.endWeek
    if(req.body.teacher)
        queryInfo.teacher = {$regex:req.body.teacher}
    if(req.body.schoolID)
        queryInfo.schoolID = req.body.schoolID
    if(req.body.place)
        queryInfo.place = {$regex:req.body.place}

    const course = await Coursedata.find(
        queryInfo
    );

    if (!course) {
        console.log(queryInfo)
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    else {
        res.send(course)
    }
})

//编辑课程数据
app.post("/admin/edit-course", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        courseName: req.body.courseName,
        whichDay: req.body.whichDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        startWeek: req.body.startWeek,
        endWeek: req.body.endWeek,
        weekInfo: req.body.weekInfo,
        teacher: req.body.teacher,
        place: req.body.place,
        schoolID: req.body.schoolID
    }
    console.log(req.body._id)

    await Coursedata.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

//删除课程数据
app.post("/admin/delete-course", async (req, res) => {
    await Coursedata.deleteOne({
        _id: req.body._id
    })
    res.send("");
})


//学校
//创建新学校
app.post("/api/school/new", async (req, res) => {
    const school = await School.create({
        schoolName: req.body.schoolName,
    })
    res.send(school);
})

//根据id取得学校
app.post("/api/school/get-specific-school", async (req, res) => {
    const school = await School.find({
        _id: req.body._id
    })
    res.send(school);
})

//编辑学校
app.post("/api/school/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        schoolName : req.body.schoolName
    }
    console.log(req.body._id)

    await School.updateOne(
        id,
        updateInfo
    )
    res.send("")
})
//查询学校
app.post("/api/school/get-school", async (req, res) => {
    let queryInfo = {
    }
    if(req.body.schoolName)
        queryInfo.schoolName = {$regex:req.body.schoolName}

    const school = await School.find(
        queryInfo
    );

    if (!school) {
        console.log(queryInfo)
        console.log("无学校")
        res.status(404).send({
            message: "找不到学校"
        })
        return
    }
    else {
        res.send(school)
    }
})
//删除学校
app.post("/api/school/delete", async (req, res) => {
    await School.deleteOne({
        _id: req.body._id
    })
    res.send("");
})

//备忘录
//编辑备忘录
app.post("/api/backlog/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        title: req.body.title,
        content: req.body.content,
        courseID:req.body.courseID
    }

    await Backlog.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

//查询备忘录
app.post("/api/backlog/get-backlog", async (req, res) => {
    let queryInfo = {
    }
    if(req.body.username)
        queryInfo.username = req.body.username
    if(req.body.title)
        queryInfo.title = {$regex:req.body.title}
    if(req.body.content)
        queryInfo.content = {$regex:req.body.content}
    if(req.body.createTime)
        queryInfo.createTime = req.body.createTime
    if(req.body.reminderID)
        queryInfo.reminderID = req.body.reminderID
    if(req.body.courseID)
        queryInfo.courseID=req.body.courseID

    const backlog = await Backlog.find(
        queryInfo
    );

    if (!backlog) {
        console.log(queryInfo)
        console.log("无备忘录")
        res.status(404).send({
            message: "找不到备忘录"
        })
        return
    }
    else {
        res.send(backlog)
    }
})


//提醒事项
//创建新提醒事项
app.post("/api/reminder/new", async (req, res) => {
    const reminder = await Reminder.create({
        status: req.body.status,
        eventTime: req.body.eventTime,
        reminderTime: req.body.reminderTime,
    })
    res.send(reminder);
})

//编辑提醒事项
app.post("/api/reminder/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        status: req.body.status,
        eventTime: req.body.eventTime,
        reminderTime: req.body.reminderTime,
    }
    await Reminder.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

//根据id取得提醒事项
app.post("/api/reminder/get-specific-reminder", async (req, res) => {
    const reminder = await Reminder.find({
        _id: req.body._id
    })
    res.send(reminder);
})

//删除提醒事项
app.post("/api/reminder/delete", async (req, res) => {
    await Reminder.deleteOne({
        _id: req.body._id
    })
    res.send("");
})



=======
const ObjectId = require('mongodb').ObjectId;
//package.json里有写启动命令让nodemon自动启动
const express = require('express');
const { User, Course, Backlog, Announcement } = require('./db');

const app = express();
app.use(express.json())

app.listen(3000, () => {
    console.log('server running!');
})

app.get("/hello", (req, res) => {
    res.send("success");
})


//查询目前的所有表👇
app.get("/api/users", async (req, res) => {
    const users = await User.find()
    res.send(users);
})

app.get("/api/courses", async (req, res) => {
    const courses = await Course.find()
    res.send(courses);
})

app.get("/api/backlogs", async (req, res) => {
    const backlogs = await Backlog.find()
    res.send(backlogs);
})

app.get("/api/announcements", async (req, res) => {
    const announcements = await Announcement.find()
    res.send(announcements);
})

//POST API👇
app.post("/api/register", async (req, res) => { //管理员权限是调用api来赋予的，不是在注册时给的数据
    const userFind = await User.findOne({
        username: req.body.username
    })

    if (!userFind) {
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            accountStatus: req.body.accountStatus
        })
        res.send(user);
    }
    else {
        return res.status(422).send({
            message: "账号名已存在"
        })
    }
})

app.post("/api/login", async (req, res) => {
    const user = await User.findOne({
        username: req.body.username
    })
    if (!user) {
        return res.status(422).send({
            message: "用户名不存在"
        })
    }
    if (!(req.body.password == user.password)) {
        return res.status(422).send({
            message: "密码错误"
        })
    }
    res.send(user)
})

app.post("/api/me/set-status", async (req, res) => {
    let username = {
        username: req.body.username
    }
    let updateInfo = {
        accountStatus: req.body.accountStatus
    }
    console.log(req.body.username)
    console.log(req.body.accountStatus)
    await User.updateOne(
        username,
        updateInfo
    )
    res.send("")
})

app.post("/api/me/get-status", async (req, res) => {
    const userFind = await User.findOne({
        username: req.body.username
    })
    console.log(req.body.username)
    console.log(req.body.accountStatus)
    res.send(userFind)
})

app.post("/api/course/new", async (req, res) => {
    const course = await Course.create({
        username: req.body.username,
        courseName: req.body.courseName,
        whichDay: req.body.whichDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        teacher: req.body.teacher,
        group: req.body.group,
        color: req.body.color
    })
    res.send(course);
})

app.post("/api/course/get-all-courses", async (req, res) => {
    const courses = await Course.find({
        username: req.body.username
    })
    if (!courses) {
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    console.log(courses)
    res.send(courses);
})

app.post("/api/course/search", async (req, res) => {
    const course = await Course.findOne({
        username: req.body.username,
        courseName: req.body.courseName
    })
    if (!course) {
        console.log(req.body.username, req.body.courseName)
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    else {
        res.send(course)
    }
})

app.post("/api/course/get-specific-course", async (req, res) => {
    const course = await Course.find({
        _id: req.body._id
    })
    res.send(course);
})

app.post("/api/course/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        username: req.body.username,
        courseName: req.body.courseName,
        whichDay: req.body.whichDay,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        teacher: req.body.teacher,
        group: req.body.group,
        color: req.body.color,
    }
    console.log(req.body._id)

    await Course.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

app.post("/api/course/delete", async (req, res) => {
    await Course.deleteOne({
        _id: req.body._id
    })
    res.send("");
})

app.post("/api/announcement/get-specific-announcement", async (req, res) => {
    const announcement = await Announcement.find({
        _id: req.body._id
    })
    res.send(announcement);
})

app.post("/api/announcement/delete", async (req, res) => {
    await Announcement.deleteOne({
        _id: req.body._id
    })
    res.send("");
})

app.post("/api/announcement/new", async (req, res) => {
    const announcement = await Announcement.create({
        username: req.body.username,
        createTime: req.body.createTime,
        lastEditTime: req.body.createTime,
        content: req.body.content,
        title: req.body.title
    })
    res.send(announcement);
})

//////////////////////
app.post("/api/announcement/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        lastEditTime: req.body.createTime,
        content: req.body.content,
        title: req.body.title
    }
    console.log(req.body._id)

    await Announcement.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

app.post("/api/backlog/new", async (req, res) => {
    const backlog = await Backlog.create({
        username: req.body.username,
        createTime: req.body.createTime,
        title: req.body.title,
        content: req.body.content,
    })
    res.send(backlog);
})

app.post("/api/backlog/get-all-backlogs", async (req, res) => {
    const backlogs = await Backlog.find({
        username: req.body.username
    })
    if (!backlogs) {
        console.log("无备忘事项")
        res.status(404).send({
            message: "找不到备忘事项"
        })
        return
    }
    console.log(backlogs)
    res.send(backlogs);
})

app.post("/api/backlog/get-specific-backlog", async (req, res) => {
    const backlog = await Backlog.find({
        _id: req.body._id
    })
    res.send(backlog);
})

app.post("/api/backlog/delete", async (req, res) => {
    await Backlog.deleteOne({
        _id: req.body._id
    })
    res.send("");
})

app.post("/api/backlog/edit", async (req, res) => {
    let id = {
        _id: new ObjectId(req.body._id)
    }
    let updateInfo = {
        title: req.body.title,
        content: req.body.content,
    }

    await Backlog.updateOne(
        id,
        updateInfo
    )
    res.send("")
})

app.post("/admin/set", async (req, res) => {
    let username = {
        username: req.body.username
    }
    const user = User.findOne(username)
    if (user) {
        let updateInfo = {
            admin: req.body.admin
        }
        await User.updateOne(
            username,
            updateInfo
        )
        console.log("设置成功!")
        console.log(user)
    }
    else {
        console.log("用户不存在!")
    }
})

app.post("/admin/course-search", async (req, res) => {
    const course = await Course.find({
        courseName: req.body.courseName
    })
    if (!course) {
        console.log(req.body.courseName)
        console.log("无课程")
        res.status(404).send({
            message: "找不到课程"
        })
        return
    }
    else {
        res.send(course)
    }
})












>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
