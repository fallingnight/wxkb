export interface Course {
  username: string;
  courseName: string;
  whichDay: number;
  startTime: string;
  endTime: string;
  teacher: string;
  group: number;
  color: string;
  __v: number;
  _id: string;
}
export interface User{
  username: string;
  password: string;
  admin: boolean;
  accountStatus: number;
  _id: string;
}