import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors} from '../components/constants';

// components
import SETsController from './SETsController';

const ExerciseCard = ({exercise, exData}) => {
  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = id => {
    let exername = exData.filter(element => {
      return element.id === id;
    });
    return exername[0].title;
  };

  return (
    <View style={style.cardContainer}>
      {/* Exercise Titile */}
      <Text style={style.exerciseTitleStyle}>
        {getExerciseName(exercise.id)}
      </Text>

      <SETsController indicatorTitle={'Set'} />

      {/* Dividor */}
      <View
        style={{
          borderWidth: 1,
          width: 300,
          borderColor: colors.secondaryow,
        }}
      />

      <SETsController indicatorTitle={'Rep'} />
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.secondaryow,
    borderRadius: 20,
  },
  exerciseTitleStyle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    marginTop: 10,
  },
});

export default ExerciseCard;
