import Moment from 'moment';
import { extendMoment } from 'moment-range';
import 'moment/locale/ru';

const moment = extendMoment(Moment);

const Calendar = ({ date }) => {
  const currentDate = moment(date).format('DD.MM.YYYY')
  const currentDay = moment(date).format('D');
  const currentDayWeek = moment(date).format('dddd');
  const currentMonth = moment(date).format('MMMM');
  const genitiveMonth = moment(currentMonth, 'MMMM').format('D MMMM').split(/[ ]+/)[1];
  const currentYear = moment(date).format('YYYY');

  const currentDateStyle = 'ui-datepicker-today';
  const otherMonthDateStyle = 'ui-datepicker-other-month';

  const calendarDates = [];
  const startOfMonth = moment(date).startOf('month').format('YYYY-MM-DD');  
  const endOfMonth = moment(date).endOf('month').format('YYYY-MM-DD');
  const firstWeekDay = moment(startOfMonth).startOf('week').format('YYYY-MM-DD');
  const lastWeekDay = moment(endOfMonth).endOf('week').format('YYYY-MM-DD');
  const weekRange = moment.range(firstWeekDay, lastWeekDay);

  calendarDates.push(Array.from(weekRange.by('day')));

  const dateRange = calendarDates[0].map(day => moment(day._d).format('DD.MM.YYYY'));

  const dateRangeByWeek = [];

  for (let i = 0; i < dateRange.length; i += 7) {
    const week = dateRange.slice(i, i + 7);

    dateRangeByWeek.push(week);
  }

  function renderDays(array) {
    const days = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i] === currentDate) {
        days.push(<td key={i} className={currentDateStyle}>{+array[i].substring(0, 2)}</td>);
      }
      else if (moment(array[i], 'DD.MM.YYYY').format('MMMM') !== currentMonth) {
        days.push(<td key={i} className={otherMonthDateStyle}>{+array[i].substring(0, 2)}</td>);
      }
      else {
        days.push(<td key={i}>{+array[i].substring(0, 2)}</td>);
      }
    }

    return days;
  }

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">{currentDayWeek}</div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{currentDay}</div>
          <div className="ui-datepicker-material-month">{genitiveMonth}</div>
          <div className="ui-datepicker-material-year">{currentYear}</div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">{currentMonth}</span>&nbsp;<span className="ui-datepicker-year">{currentYear}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" title="Понедельник">Пн</th>
            <th scope="col" title="Вторник">Вт</th>
            <th scope="col" title="Среда">Ср</th>
            <th scope="col" title="Четверг">Чт</th>
            <th scope="col" title="Пятница">Пт</th>
            <th scope="col" title="Суббота">Сб</th>
            <th scope="col" title="Воскресенье">Вс</th>
          </tr>
        </thead>
        <tbody>
          <tr>{renderDays(dateRangeByWeek[0].map(day => day))}</tr>
          <tr>{renderDays(dateRangeByWeek[1].map(day => day))}</tr>
          <tr>{renderDays(dateRangeByWeek[2].map(day => day))}</tr>
          <tr>{renderDays(dateRangeByWeek[3].map(day => day))}</tr>
          <tr>{dateRangeByWeek[4] && renderDays(dateRangeByWeek[4].map(day => day))}</tr>
          <tr>{dateRangeByWeek[5] && renderDays(dateRangeByWeek[5].map(day => day))}</tr>
        </tbody>
      </table>
    </div>
  )
}

export default Calendar;