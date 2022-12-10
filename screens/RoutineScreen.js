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

// Navigation
import {useNavigation} from '@react-navigation/native';

// Store
import useStore from '../store/useStore';

// Componenets
import RoutineCard from '../components/RoutineCard';

const RoutineScreen = () => {
  const routines = useStore(s => s.routines);
  const selectCurrentRoutine = useStore(s => s.selectCurrentRoutine);
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <View className="items-center">
          <Text style={{fontSize: 30, fontWeight: '700', color: colors.white}}>
            Routines
          </Text>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 72}}
          style={{marginTop: 20}}>
          {routines?.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                // console.log(JSON.stringify(item));
                selectCurrentRoutine(item.id);
                navigation.navigate('ScheduleScreen');
              }}>
              <RoutineCard id={item.id} title={item.title} />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default RoutineScreen;

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
