import dayjs from 'dayjs';
import debounce from 'lodash/debounce';

export const dateTimeFormat = (customDate) => {
  if (!customDate) {
    return ""
  }
  return dayjs(customDate).format("DD-MM-YYYY hh:mm a")
}

export const debouncedHandleSearch = debounce((value) => {
  return value
}, 500); 
