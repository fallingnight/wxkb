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
    return hexColor.toUpperCase(); 
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
};
