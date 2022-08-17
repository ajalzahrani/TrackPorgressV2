import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';

import AddNewWorkout from '../components/AddNewWorkout';
import CalenderRow from '../components/CalenderRow';
import {color} from 'react-native-reanimated';

const ScheduleScreen = () => {
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <AddNewWorkout />
      <CalenderRow />
      <View style={style.titleButtonContainerStyle}>
        <Text style={style.workoutTitleStyle}>Pushup workout</Text>
        <TouchableOpacity>
          <LinearGradient
            // className="py-3 px-20 rounded-full mt-10"
            style={style.touchableOpacityStartStyle}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#FA3B89', '#E10D60']}>
            <View className="flex-row justify-center items-center space-x-2">
              <Image source={require('../asset/icn_start.png')} />
              <Text className="text-base font-semibold text-white">Start</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  workoutTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 45,
    textAlign: 'center',
    color: '#FFFFFF',
    marginTop: 56,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 24.5,
  },
  startTextStyle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
  titleButtonContainerStyle: {
    marginHorizontal: 72,
  },
});

export default ScheduleScreen;
