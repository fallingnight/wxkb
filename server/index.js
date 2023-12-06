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












