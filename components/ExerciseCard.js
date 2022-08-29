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
import {useNavigation} from '@react-navigation/native';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

// components
import AddNewWorkout from '../components/AddNew';
import SETsController from './SETsController';

const ExerciseCard = ({exerName}) => {
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
