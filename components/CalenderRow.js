import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors} from './constants';

// Store
import useStore from '../store/useStore';

const weekObj = {
  Saturday: false,
  Sunday: false,
  Monday: false,
  Tuesday: false,
  Wednesday: false,
  Thursday: false,
  Friday: false,
};

const CalenderRow = () => {
  const weekdays = useStore(s => s.weekdays);
  const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);
  const selectCurrentDay = useStore(s => s.selectCurrentDay);
  const [isOn, setisOn] = useState(weekObj);

  // useEffect(() => {
  //   handleWhichDay();
  // }, []);

  const handleWhichDay = () => {
    var date = new Date();
    date.setDate(date.getDate() + 0); // add day
    const todayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name

    date.setDate(date.getDate() - 1); // min day
    const yesterdayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name

    const udpateToday = {[todayName]: true}; // this is how to use variable as object key with {[variable]: value}
    const updateYesterday = {[yesterdayName]: false};

    // set it to state
    setisOn(prev => {
      return {prev, ...udpateToday, ...updateYesterday};
    });
  };

  return (
    // <View className="flex-row justify-around pt-5 mx-3">
    <View style={style.containerStyle}>
      {weekdays.map(day => {
        return (
          <TouchableOpacity
            key={day.id}
            onPress={() => {
              console.log(day);
              selectCurrentDay(day.id);
              selectCurrentWorkout(day.workout[0]);
            }}
            // onPress={() => console.log(day.workout[0])}
            style={{
              display: 'flex',
              backgroundColor: day.workday ? colors.secondary : colors.offwhite,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              height: 44,
              width: 44,
              order: 6,
              flexGrow: 0,
            }}>
            <Text style={style.textSytle}>{day.id}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
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
