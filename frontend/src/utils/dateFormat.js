import moment from 'moment'

export default function dateFormat(date, format = 'YYYY-MM-DD') {
  return moment(date).format(format)
}
