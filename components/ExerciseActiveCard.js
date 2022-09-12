import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

// Assets
import {colors, assets} from './constants';

const ExerciseActiveCard = ({exercise, exData}) => {
  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = id => {
    let exername = exData.filter(element => {
      return element.id === id;
    });
    return exername[0]?.title;
  };

  return (
    <View style={style.cardContainer}>
      <Text style={style.workoutTitle}>{getExerciseName(exercise.id)}</Text>
      <View style={style.editContainerStyle} className="space-x-2">
        <TouchableOpacity onPress={() => {}}>
          <Image source={assets.icn_goforward} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={assets.icn_edit} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  // Exercise card
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
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

export default ExerciseActiveCard;
