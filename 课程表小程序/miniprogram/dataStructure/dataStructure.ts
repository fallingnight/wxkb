export interface Course {
<<<<<<< HEAD
  _courseTableID:string;
  _coursedataID:string;
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  username: string;
  courseName: string;
  whichDay: number;
  startTime: string;
  endTime: string;
<<<<<<< HEAD
  startWeek: string;
  endWeek: string;
  weekInfo:string;
  teacher: string;
  place:string;
  group: string;
  color: string;
  reminderID:string;
=======
  teacher: string;
  group: number;
  color: string;
  __v: number;
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  _id: string;
}
export interface User{
  username: string;
  password: string;
  admin: boolean;
  accountStatus: number;
  _id: string;
<<<<<<< HEAD
}

export interface Announcement{
    username: string;
    createTime: string ;
    lastEditTime: string ;
    title: string ;
    content:string ;
    _id:string;
}

export interface Backlog{
  username: string;
  title: string;
  content: string;
  createTime: string;
  reminderID: string;//提醒的_id
  courseID:string;
  _id: string;
}

export interface Reminder{
  status: number;
  eventTime: string;
  reminderTime: string;
  _id: string;
}

export interface Coursedata{
  courseName: string;
  whichDay: number;
  startTime: string;
  endTime: string;
  startWeek: string;
  endWeek: string;
  weekInfo:string;
  teacher: string;
  place:string;
  schoolID:string;
  _id: string;

}

export interface CourseTable{
  _id:string;
  username:string;
}

export interface CourseGroup{
  _id:string;
  groupname:string;
  username:string;
=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
}