export interface Course {
  _courseTableID:string;
  _coursedataID:string;
  username: string;
  courseName: string;
  whichDay: number;
  startTime: string;
  endTime: string;
  startWeek: string;
  endWeek: string;
  weekInfo:string;
  teacher: string;
  place:string;
  group: string;
  color: string;
  reminderID:string;
  _id: string;
}
export interface User{
  username: string;
  password: string;
  admin: boolean;
  accountStatus: number;
  _id: string;
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
}