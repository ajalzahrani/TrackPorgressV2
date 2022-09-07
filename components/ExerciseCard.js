import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

// Assets
import {colors} from '../components/constants';

// components
import SETsController from './SETsController';

const ExerciseCard = ({exerName, index, addFreq}) => {
  return (
    <View style={style.cardContainer}>
      {/* Exercise Titile */}
      <Text style={style.exerciseTitleStyle}>{exerName}</Text>

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
