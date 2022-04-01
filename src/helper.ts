import moment from "moment";

export const DataFormatType = {
  dateFormat: 'DD.MM.YYYY',
  dateTimeFormat: 'DD.MM.YYYY HH:mm',
  timeFormat: 'HH:mm',
  dayFormat: 'DD',
  monthFormat: 'MMMM',
  yearFormat: 'yyyy',
  getTimeZone: 'YYYY-MM-DD',
};

const _dateFormat = (date: any, format: string) => {
  if (date) return moment(date).format(format);
};

export const Helper = {
  dateFormat : _dateFormat
}