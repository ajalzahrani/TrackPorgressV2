import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState, useMemo} from 'react';

import {colors, assets} from './constants';

import {useNavigation} from '@react-navigation/native';

// Store
import useStore from '../store/useStore';
import PressableButton from './PressableButton';

import RoutineFormScreen from '../screens/RoutineFormScreen';

import uuidv4 from './shared/uuid4v';

const RoutineCard = ({id, title}) => {
  const deleteRoutine = useStore(s => s.deleteRoutine);
  const routines = useStore(s => s.routines);
  const selectCurrentRoutine = useStore(s => s.selectCurrentRoutine);
  const navigation = useNavigation();

  return (
    <View style={style.cardContainer}>
      <Text style={style.workoutTitle}>{title}</Text>
      <View style={style.editContainerStyle} className="space-x-4">
        <TouchableOpacity
          onPress={() => {
            console.log(uuidv4());
            // console.log(
            //   `StartDate: ${routines[id]?.startDate} - EndDate: ${routines[id]?.endDate}`,
            // );
          }}>
          <Image source={assets.icn_home} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectCurrentRoutine(id);
            navigation.navigate('RoutineFormScreen');
          }}>
          <Image source={assets.icn_plus} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            deleteRoutine(id);
          }}>
          <Image source={assets.icn_remove} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.secondaryow,
    borderRadius: 10,
  },
  workoutTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    color: colors.white,
  },
  editContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchableOpacityArrowStyle: {
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },
});

export default RoutineCard;
