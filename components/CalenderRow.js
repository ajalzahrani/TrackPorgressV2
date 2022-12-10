import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import produce from 'immer';

import {colors} from './constants';

// Store
import useStore from '../store/useStore';

const dayButton = [
  {id: 0, ispicked: false, istoday: false},
  {id: 1, ispicked: false, istoday: false},
  {id: 2, ispicked: false, istoday: false},
  {id: 3, ispicked: false, istoday: false},
  {id: 4, ispicked: false, istoday: false},
  {id: 5, ispicked: false, istoday: false},
  {id: 6, ispicked: false, istoday: false},
];

const CalenderRow = () => {
  const weekdays = useStore(s => s.weekdays);
  const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);
  const selectCurrentDay = useStore(s => s.selectCurrentDay);
  const [isOn, setisOn] = useState();
  const [db, setDB] = useState(dayButton);

  const generateWorkdays = () => {
    const array = weekdays.map(day => {
      return (
        <TouchableOpacity
          key={day.id}
          onPress={() => {
            selectCurrentDay(day.id);
            selectCurrentWorkout(day.workout);
            setDB(
              produce(draft => {
                draft.forEach(day => (day.ispicked = false));
                draft[day.id].ispicked = true;
              }),
            );
          }}
          style={[
            {
              display: 'flex',
              backgroundColor: day.workday ? colors.secondary : colors.offwhite,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,

              height: db[day.id].ispicked ? 44 : 44,
              width: db[day.id].ispicked ? 65 : 44,
              order: 6,
              flexGrow: 0,
            },
            {
              // shadowColor: db[day.id].ispicked ? '#fff' : '#000',
              // shadowOffset: {width: 0, height: 20},
              // shadowOpacity: 0.58,
              // shadowRadius: 16.0,
              // elevation: 24,
            },
          ]}>
          <Text style={style.textSytle}>{day.symbol}</Text>
        </TouchableOpacity>
      );
    });
    return <>{array}</>;
  };

  // useEffect(() => {
  //   handleWhichDay();
  // }, []);

  // const handleWhichDay = () => {
  //   var date = new Date();
  //   date.setDate(date.getDate() + 0); // add day
  //   const todayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name

  //   date.setDate(date.getDate() - 1); // min day
  //   const yesterdayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name

  //   const udpateToday = {[todayName]: true}; // this is how to use variable as object key with {[variable]: value}
  //   const updateYesterday = {[yesterdayName]: false};

  //   // set it to state
  //   setisOn(prev => {
  //     return {prev, ...udpateToday, ...updateYesterday: false},;
  //   });
  // };

  return (
    // <View className="flex-row justify-around pt-5 mx-3">
    <View style={style.containerStyle}>{generateWorkdays()}</View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    marginTop: 26,
    marginHorizontal: 16,
    // position: 'absolute',
    // width: 358,
    // height: 44,
    // left: 16,
    // top: 100,
  },
  touchableOpacityStyle: {
    display: 'flex',
    backgroundColor: colors.offwhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 44,
    width: 44,
    order: 6,
    flexGrow: 0,
  },
  textSytle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: colors.white,
  },
});

export default CalenderRow;
