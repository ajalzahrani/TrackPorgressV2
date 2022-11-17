import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState, useMemo, useEffect} from 'react';
import {Calendar} from 'react-native-calendars';
import {colors} from './constants';
import {useGstore} from '../gstore';
import {convertDate} from './shared';
import moment from 'moment';

const Calendars = ({setSelectedDate}) => {
  const sessions = useGstore(state => state.sessions);
  const [selected, setSelected] = useState(initDate); // hold selected day
  const initDate = '2022-11-01';
  const [markedDate, setMarkedDate] = useState({}); // hold datetime

  const select = useMemo(
    () => ({
      [selected]: {
        selected: true,
        selectedColor: '#222222',
        selectedTextColor: 'yellow',
      },
    }),
    [selected],
  );

  const marked = {
    '2022-11-02': {marked: 'true'},
    '2022-11-04': {marked: 'true'},
    '2022-11-06': {selected: 'true', selectedColor: '#aa2222'},
    '2022-11-13': {
      marked: true,
      selected: true,
      selectedColor: '#222222',
      selectedTextColor: 'yellow',
      dotColor: 'white',
    },
  };

  useEffect(() => {
    let marked = {};
    sessions.forEach(item => {
      marked[moment(item.datetime).format('YYYY-MM-DD')] = {
        selected: 'true',
        selectedColor: '#222222',
      };
    });
    setMarkedDate(marked);
  }, []);

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
          setSelected(day.dateString);
          setSelectedDate(day.dateString);
        }}
        style={{
          borderRadius: 10,
          marginVertical: 0,
          // elevation: 5,
          // borderWidth: 4,
          // borderColor: 'rgba(100, 100, 100, 0.2)',
        }}
        // theme={{
        //   calendarBackground: '#222',
        //   dayTextColor: '#fff',
        //   textDisabledColor: '#444',
        //   monthTextColor: '#888',
        // }}
        theme={{
          calendarBackground: colors.offwhite,
          dayTextColor: '#fff',
          textDisabledColor: '#444',
          monthTextColor: colors.yellow,
        }}
        // dayComponent={({date, state}) => {
        //   return (
        //     <View>
        //       <Text
        //         style={{
        //           textAlign: 'center',
        //           color: state === 'disabled' ? 'gray' : 'black',
        //         }}>
        //         {date.day}
        //       </Text>
        //     </View>
        //   );
        // }}
      />
      {/* <TouchableOpacity
        style={{paddin: 20, backgroundColor: 'red'}}
        onPress={sessionsDatetime}>
        <Text style={{color: colors.white, padding: 20}}>Check</Text>
      </TouchableOpacity> */}
    </>
  );
};

export default Calendars;
