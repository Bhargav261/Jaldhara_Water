import dayjs from 'dayjs';

export const dateTimeFormat = (customDate) => {
  if (!customDate) {
    return ""
  }
  return dayjs(customDate).format("DD-MM-YYYY")
}

export const todatDate = () => {
  return dayjs().format('YYYY-MM-DD');
}