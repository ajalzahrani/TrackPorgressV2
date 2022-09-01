import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

import {colors} from './constants';

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
  const [isOn, setisOn] = useState(weekObj);

  useEffect(() => {
    handleWhichDay();
  }, []);

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
      <TouchableOpacity
        style={{
          display: 'flex',
          backgroundColor: isOn.Sunday ? colors.secondary : colors.offwhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          height: 44,
          width: 44,
          order: 6,
          flexGrow: 0,
        }}>
        <Text style={style.textSytle}>S</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          backgroundColor: isOn.Monday ? colors.secondary : colors.offwhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          height: 44,
          width: 44,
          order: 6,
          flexGrow: 0,
        }}>
        <Text style={style.textSytle}>M</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          backgroundColor: isOn.Tuesday ? colors.secondary : colors.offwhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          height: 44,
          width: 44,
          order: 6,
          flexGrow: 0,
        }}>
        <Text style={style.textSytle}>T</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          backgroundColor: isOn.Wednesday ? colors.secondary : colors.offwhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          height: 44,
          width: 44,
          order: 6,
          flexGrow: 0,
        }}>
        <Text style={style.textSytle}>W</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          backgroundColor: isOn.Thursday ? colors.secondary : colors.offwhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          height: 44,
          width: 44,
          order: 6,
          flexGrow: 0,
        }}>
        <Text style={style.textSytle}>T</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          backgroundColor: isOn.Friday ? colors.secondary : colors.offwhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          height: 44,
          width: 44,
          order: 6,
          flexGrow: 0,
        }}>
        <Text style={style.textSytle}>F</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          display: 'flex',
          backgroundColor: isOn.Saturday ? colors.secondary : colors.offwhite,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          height: 44,
          width: 44,
          order: 6,
          flexGrow: 0,
        }}
        // onPress={() => handleWhichDay()}
      >
        <Text style={style.textSytle}>S</Text>
      </TouchableOpacity>
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
