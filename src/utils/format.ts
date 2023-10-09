import dayjs from "dayjs";
import "dayjs/locale/ko";

dayjs.locale("ko");

export const dateFormat = (date: string) => dayjs(date).format("YYYY-MM-DD, (ddd) HH:mm");