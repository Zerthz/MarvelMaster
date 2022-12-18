import dayjs from "dayjs";
const lessThanOneHourAgo = (date) => { return dayjs(date).isAfter(dayjs().subtract(1, 'hours')); };
export default lessThanOneHourAgo;