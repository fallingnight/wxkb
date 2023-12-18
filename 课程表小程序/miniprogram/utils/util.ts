<<<<<<< HEAD
export const CourseTimeMap = {
  1: { start: "08:15", end: "09:00" },
  2: { start: "09:10", end: "09:55" },
  3: { start: "10:15", end: "11:00" },
  4: { start: "11:10", end: "11:55" },
  5: { start: "13:50", end: "14:35" },
  6: { start: "14:45", end: "15:40" },
  7: { start: "15:40", end: "16:25" },
  8: { start: "16:45", end: "17:30" },
  9: { start: "17:40", end: "18:25" },
  10: { start: "19:20", end: "20:05" },
  11: { start: "20:15", end: "21:00" },
  12: { start: "21:10", end: "21:55" }
};

=======
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
export const formatTime = (date: Date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return (
    [year, month, day].map(formatNumber).join('/') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  )
}

export const formatNumber = (n: number) => {
  const s = n.toString()
  return s[1] ? s : '0' + s
}

export const getDateObjs = (date = new Date()) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  return {
    year,
    month,
    day
  }
}
export const getFirstdayofDate = (startDate: Date, isMonday: boolean) => {
  const currentDate = new Date(startDate);
  const currentDayOfWeek = currentDate.getDay();
  // 计算需要减去的天数，将当前日期调整到第一天（星期一或星期日）
  let daysToFirstDay;
  if (!isMonday) {
    daysToFirstDay = currentDayOfWeek;
  } else {
    daysToFirstDay = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1;
  }

  // 计算第一天（星期一或星期日）的日期
  const firstDay = new Date(currentDate);
  firstDay.setDate(currentDate.getDate() - daysToFirstDay);
  return firstDay
}

export const rgb2hex = (rgbString: string) => {
  const match = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (match) {
    const [, red, green, blue] = match.map(Number);
    const hexColor = `#${red.toString(16).padStart(2, '0')}${green.toString(16).padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`;
<<<<<<< HEAD
    return hexColor.toUpperCase();
=======
    return hexColor.toUpperCase(); 
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
  }
  return null
}

export const hex2rgb = (hexString: string) => {
  const match = hexString.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (match) {
    const [, red, green, blue] = match.map((value) => parseInt(value, 16));
    const rgbColor = `rgb(${red}, ${green}, ${blue})`;
    return rgbColor;
  }
  return null;
<<<<<<< HEAD
}

export const getNowFullTime = () => {
  var myDate = new Date;
  var year = myDate.getFullYear(); //获取当前年
  var mon = formatNumber(myDate.getMonth() + 1); //获取当前月
  var date = formatNumber(myDate.getDate()); //获取当前日
  var hours = formatNumber(myDate.getHours()); //获取当前小时
  var minutes = formatNumber(myDate.getMinutes()); //获取当前分钟
  var seconds = formatNumber(myDate.getSeconds());
  var now = year + "-" + mon + "-" + date + " " + hours + ":" + minutes + ":" + seconds;
  return now;
}
export const getNowDate = () => {
  var myDate = new Date;
  var year = myDate.getFullYear(); //获取当前年
  var mon = formatNumber(myDate.getMonth() + 1); //获取当前月
  var date = formatNumber(myDate.getDate()); //获取当前日
  var now = year + "-" + mon + "-" + date;
  return now;
}
export const getNowTime = () => {
  var myDate = new Date;
  var hours = formatNumber(myDate.getHours()); //获取当前小时
  var minutes = formatNumber(myDate.getMinutes()); //获取当前分钟
  var now = hours + ":" + minutes;
  return now;
}
export const parseDateString = (dateString: string) => {
  const [datePart, timePart] = dateString.split(' ');
  const [year, month, day] = datePart.split('-');
  const [hours, minutes] = timePart.split(':');

  // 月份是从 0 开始计数，因此要减去 1
  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hours), parseInt(minutes));
}
export const formatDatetoMinute = (d: Date) => {
  var year = d.getFullYear(); //获取当前年
  var mon = formatNumber(d.getMonth() + 1); //获取当前月
  var date = formatNumber(d.getDate()); //获取当前日
  var hours = formatNumber(d.getHours()); //获取当前小时
  var minutes = formatNumber(d.getMinutes()); //获取当前分钟
  var nowhm = hours + ":" + minutes;
  return year + "-" + mon + "-" + date + " " + nowhm;
}
export const mapToNearestTime = (weekday: number, startHour: number, startMinute: number) => {
  const now = new Date();
  const currentDay = now.getDay();

  let daysToAdd = (weekday - currentDay + 7) % 7;
  let nearestDate = new Date(now);
  nearestDate.setDate(now.getDate() + daysToAdd);
  if (now > nearestDate) {
    daysToAdd = 7; // 下一周
    nearestDate.setDate(now.getDate() + daysToAdd);
  }
  nearestDate.setHours(startHour, startMinute);
  let reminderDate = new Date(nearestDate);
  reminderDate.setHours(startHour, startMinute - 30);
  const formatedDate = formatDatetoMinute(nearestDate);
  const formatReminderDate = formatDatetoMinute(reminderDate);

  return { formatedDate, formatReminderDate };
}

=======
};
>>>>>>> 35ef0c111c76f9fc1a00e74a0bf281286af91b00
