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
import {useIsFocused} from '@react-navigation/native';
import {store} from '../Store';

// Components
import AddNew from '../components/AddNew';
import CalenderRow from '../components/CalenderRow';
import WorkoutCard from '../components/WorkoutCard';
import {
  getDayObject,
  getWorkoutObject,
  getDayLabel,
} from '../components/shared/';

// Assets
import {colors, assets} from '../components/constants';

// Store
import useStore from '../store/useStore';

import {useNavigation} from '@react-navigation/native';

const ScheduleScreen = ({route}) => {
  // FIXME: workout name should'nt take all the space in pre-list of workout
  // FIXME: Hidden start button can be clicked ??
  // FIXME: Unassign schedule workout
  const workouts = useStore(s => s.workouts);
  const currentWorkout = useStore(s => s.currentWorkout);
  const saveWorkoutDay = useStore(s => s.saveWorkoutDay);
  const addWorkoutDay = useStore(s => s.addWorkoutDay);
  const currentDay = useStore(s => s.currentDay);
  const unselectCurrentDay = useStore(s => s.unselectCurrentDay);
  const unselectCurrentWorkout = useStore(s => s.unselectCurrentWorkout);
  const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);

  const navigation = useNavigation();
  const isFoucsed = useIsFocused();

  const navigateToWorkoutById = id => {
    navigation.navigate('WorkoutScreen', {workoutId: id});
  };

  useEffect(() => {
    unselectCurrentDay();
  }, [currentWorkout]);

  useEffect(() => {
    // Check for the workoutId, coming back from workout screen. (In case of add new workout)
    if (route.params?.newWorkoutId) {
      saveSchedule(getDayLabel(), route.params?.newWorkoutId);
    }
  }, [isFoucsed, route.params?.newWorkoutId]);

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View>
        <View style={style.goBackStyle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image source={assets.icn_goback} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row flex-1 space-x-2 items-center justify-end mt-2 mr-2"
            onPress={() => {
              navigation.navigate('WorkoutScreen');
              // console.log(currentDay);
              // console.log(currentWorkout);
            }}>
            <Image source={assets.icn_plus} style={{}} />
            <Text className="text-red-500 text-base">Add new workout</Text>
          </TouchableOpacity>
        </View>

        <CalenderRow />
      </View>
      <View style={style.workoutContainerStyle}>
        <View style={{opacity: currentWorkout?.title ? 0 : 1}}>
          <Text className="text-yellow-200">
            Add new workout or select pre-configure one.
          </Text>
        </View>
        <View className="flex-row items-center space-x-5">
          <Text style={style.workoutTitleStyle}>{currentWorkout?.title}</Text>
          <TouchableOpacity
            onPress={() => navigateToWorkoutById(currentWorkout?.id)}
            style={{opacity: currentWorkout?.title ? 1 : 0}}>
            <Image source={assets.icn_edit} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => unselectCurrentDay(currentDay.id)}
            style={{opacity: currentWorkout?.title ? 1 : 0}}>
            <Image source={assets.icn_remove} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            // console.log(store.getString('workouts'));
            navigation.navigate('ActiveScreen', {
              workoutObject: currentWorkout,
            });
          }}
          style={{opacity: currentWorkout?.title ? 1 : 0}}>
          <LinearGradient
            style={style.touchableOpacityStartStyle}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#FA3B89', '#E10D60']}>
            <View className="flex-row justify-center items-center space-x-2">
              <Image source={assets.icn_start} />
              <Text className="text-base font-semibold text-white">Start</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">Pre-list of workouts</Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {workouts?.map(workout => (
              <TouchableOpacity
                key={workout.id}
                onPress={() => {
                  selectCurrentWorkout(workout.id);
                  addWorkoutDay(currentDay.id);
                }}>
                <WorkoutCard
                  id={workout.id}
                  title={workout.title}
                  navigateToWorkoutById={navigateToWorkoutById}
                />
              </TouchableOpacity>
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
  goBackStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
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
