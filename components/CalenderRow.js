import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from 'react-native';
import React from 'react';

import {colors} from './constants';

const CalenderRow = () => {
  return (
    // <View className="flex-row justify-around pt-5 mx-3">
    <View style={style.containerStyle}>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text style={style.textSytle}>S</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text style={style.textSytle}>M</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text style={style.textSytle}>T</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text style={style.textSytle}>W</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle} op>
        <Text style={style.textSytle}>T</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
        <Text style={style.textSytle}>F</Text>
      </TouchableOpacity>
      <TouchableOpacity style={style.touchableOpacityStyle}>
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
