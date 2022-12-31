import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import {Calendar, CalendarList, WeekCalendar} from 'react-native-calendars';
import {colors} from './constants';
import {useGstore} from '../gstore';
import {convertDate} from './shared';
import moment from 'moment';

const Calendars2 = ({startDay, setStartDay, endDay, setEndDay}) => {
  const [markedDate, setMarkedDate] = useState({});

  const handleDayPress = dayString => {
    // handle start date

    if (dayString === startDay) {
      setStartDay(null);
      setEndDay(null);
    } else if (dayString === endDay) {
      setEndDay(null);
    }

    if (startDay == null && endDay == null) {
      setStartDay(dayString);
    } else if (startDay !== null && endDay === null) {
      setEndDay(dayString);
    }
  };

  var getDaysArray = function (start, end) {
    for (
      var arr = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  useEffect(() => {
    let marked = {};
    let duration = [];
    if (startDay !== null && endDay !== null) {
      duration = getDaysArray(startDay, endDay);
    }

    duration?.forEach(item => {
      marked[moment(item).format('YYYY-MM-DD')] = {
        selected: true,
        selectedColor: colors.secondary,
      };
    });

    // marked[startDay] = {selected: true};
    setMarkedDate(marked);
  }, [startDay, endDay]);

  return (
    <>
      <Calendar
        // onDayPress={day => console.log(day)}
        // disableArrowLeft={true}
        // disableArrowRight={true}
        // hideArrows={true}
        // initialDate="2022-11-09"
        // showWeekNumbers={true}
        // firstDay={1}
        // minDate="2022-11-01"
        // maxDate="2022-11-12"
        markedDates={markedDate}
        enableSwipeMonths={true}
        onDayPress={day => {
          // setStartDay(day.dateString);
          // setSelectedDate(day.dateString);
          handleDayPress(day.dateString);
        }}
        style={{
          borderRadius: 10,
          marginVertical: 1,
          backgroundColor: colors.primary,
          // elevation: 5,
          // borderWidth: 4,
          // borderColor: 'rgba(100, 100, 100, 0.2)',
        }}
        theme={{
          calendarBackground: colors.primary,
          dayTextColor: colors.white,
          textDisabledColor: colors.red,
          monthTextColor: colors.white,
          weekVerticalMargin: 0,
        }}
      />
    </>
  );
};

export default Calendars2;
