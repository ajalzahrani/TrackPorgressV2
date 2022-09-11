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
import {getDayObject} from '../components/shared/';
import {getWorkoutObject} from '../components/shared/';

// Assets
import {colors, assets} from '../components/constants';

import {useNavigation} from '@react-navigation/native';

const ScheduleScreen = () => {
  const [woData, setWoData] = useState();
  const [workoutObject, setWorkoutObject] = useState({});

  const navigation = useNavigation();
  const isFoucsed = useIsFocused();

  const setupObjects = () => {
    let dayObject = getDayObject();
    let workoutObject = getWorkoutObject(dayObject?.workout[0]);
    setWorkoutObject(workoutObject);

    const workoutData = JSON.parse(store.getString('workouts'));
    setWoData(workoutData);
  };

  const navigateToWorkoutById = id => {
    navigation.navigate('WorkoutScreen', {workoutId: id});
  };

  useEffect(() => {
    setupObjects();
  }, [isFoucsed]);

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View>
        <TouchableOpacity
          className="flex-row flex-1 space-x-2 items-center justify-end mt-2 mr-2"
          onPress={() => {
            navigation.navigate('WorkoutScreen', {
              exercises: workoutObject?.exercises,
            });
          }}>
          <Image source={assets.icn_plus} style={{}} />
          <Text className="text-red-500 text-base">Add new workout</Text>
        </TouchableOpacity>
        <CalenderRow />
      </View>
      <View style={style.workoutContainerStyle}>
        <View className="flex-row items-center space-x-5">
          <Text style={style.workoutTitleStyle}>{workoutObject?.title}</Text>
          <TouchableOpacity
            onPress={() => navigateToWorkoutById(workoutObject.id)}>
            <Image source={assets.icn_edit} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            console.log(store.getString('workouts'));
          }}>
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
            {woData?.map(item => (
              <WorkoutCard
                key={item.id}
                id={item.id}
                title={item.title}
                navigateToWorkoutById={navigateToWorkoutById}
              />
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
