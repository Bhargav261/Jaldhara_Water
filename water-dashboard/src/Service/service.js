import dayjs from 'dayjs';

export const dateTimeFormat = (customDate) => {
  if (!customDate) {
    return ""
  }
  return dayjs(customDate).format("DD-MM-YYYY hh:mm a")
}