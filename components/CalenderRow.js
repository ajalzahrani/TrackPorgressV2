import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

import {colors} from './constants';

const CalenderRow = () => {
  return (
    <View className="flex-row justify-around pt-5 mx-3">
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text className="text-2xl font-semibold">S</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text className="text-2xl font-semibold">M</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text className="text-2xl font-semibold">T</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text className="text-2xl font-semibold">W</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle} op>
        <Text className="text-2xl font-semibold">T</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text className="text-2xl font-semibold">F</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text className="text-2xl font-semibold">S</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  touchableOpacityStyle: {
    backgroundColor: colors.offwhite,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 30,
    height: 44,
    width: 44,
  },
});

export default CalenderRow;
