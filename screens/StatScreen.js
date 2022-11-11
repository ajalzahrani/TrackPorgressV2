import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colors} from '../components/constants';
import {sizes} from '../components/constants';
import {useGstore} from '../gstore';

const StatScreen = () => {
  const sss = useGstore(state => state.sessions);
  return (
    <SafeAreaView style={style.safeViewStyle}>
      <View className="p-5">
        <View style={style.titleViewStyle}>
          <Text style={style.titleStyle}>Statistics</Text>
        </View>
        <Text style={style.supTitleStyle}>Sessions done</Text>
        <Text style={style.detailStyle}>
          {sss.length} {sss.length === 1 ? 'session' : 'sessions'}
        </Text>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  titleStyle: {
    color: colors.white,
    fontSize: 30,
  },
  titleViewStyle: {
    alignItems: 'center',
  },
  supTitleStyle: {
    fontSize: sizes.extraLarge,
    color: colors.white,
  },
  detailStyle: {
    fontSize: sizes.medium,
    color: colors.yellow,
  },
});
export default StatScreen;
