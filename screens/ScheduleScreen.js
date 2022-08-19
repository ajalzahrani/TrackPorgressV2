import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';

// Components
import AddNewWorkout from '../components/AddNewWorkout';
import CalenderRow from '../components/CalenderRow';
import WorkoutCard from '../components/WorkoutCard';

// Assets
import {colors, workoutData} from '../components/constants';

const ScheduleScreen = () => {
  const [woData, setWoData] = useState(workoutData);
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View>
        <AddNewWorkout />
        <CalenderRow />
      </View>
      <View style={style.workoutContainerStyle}>
        <Text style={style.workoutTitleStyle}>Pushup workout</Text>
        <TouchableOpacity>
          <LinearGradient
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
      <View style={{paddingHorizontal: 16}}>
        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">Pre-list of workouts</Text>
          <ScrollView
            contentContainerStyle={{paddingBottom: 72}}
            style={{alignSelf: 'stretch'}}>
            {woData?.map(item => (
              <WorkoutCard key={item.id} id={item.id} title={item.title} />
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  preWorkoutListContainerStyle: {
    marginTop: 51,
  },
  workoutContainerStyle: {
    display: 'flex',
    flexdirection: 'column',
    alignItems: 'center',
    padding: 0,
    gap: 30,
    marginTop: 56,
  },
  workoutTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 45,
    textAlign: 'center',
    color: colors.white,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
    paddingVertical: 10,
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
