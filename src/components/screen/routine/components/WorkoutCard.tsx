import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

import {colors, assets} from './constants';

import {useNavigation} from '@react-navigation/native';

// Store
import useStore from '../../../../store/store.bak/useStore';

const WorkoutCard = ({id, title}) => {
  const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);
  const navigation = useNavigation();

  return (
    <View style={style.cardContainer}>
      <Text style={style.workoutTitle}>{title}</Text>
      <View style={style.editContainerStyle} className="space-x-2">
        <TouchableOpacity onPress={() => {}}>
          <Image source={assets.icn_goforward} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            selectCurrentWorkout(id);
            navigation.navigate('WorkoutScreen');
          }}>
          <Image source={assets.icn_edit} />
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
    flex: 1,
    flexWrap: 'wrap',
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

export default WorkoutCard;