import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {colors, assets} from './constants';
import {getWorkoutObject} from './shared';

import {useNavigation} from '@react-navigation/native';

// Store
import useStore from '../store/useStore';

const RoutineCard = ({id, title}) => {
  const deleteRoutine = useStore(s => s.deleteRoutine);
  const navigation = useNavigation();
  // FIXME: Add routine descripton drop down view
  return (
    <View style={style.cardContainer}>
      <Text style={style.workoutTitle}>{title}</Text>
      <View style={style.editContainerStyle} className="space-x-2">
        <Image source={assets.icn_start} />
        <TouchableOpacity
          onPress={() => {
            // delete routine
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
