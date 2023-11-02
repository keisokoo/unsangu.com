import dayjs from "dayjs";
import "dayjs/locale/ko";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.locale("ko");

export const dateFormat = (date: string) => dayjs(date).tz('Asia/Seoul').format("YYYY-MM-DD, (ddd) HH:mm");