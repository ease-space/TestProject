import {DateTime} from 'luxon';

export const formatTimestamp = (timestamp: number, format?: string) => {
  return DateTime.fromMillis(timestamp).toFormat(
    format || "dd.LL.yy 'в' HH:mm",
  );
};
