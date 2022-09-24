import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

import {getExerciseName} from './shared';

// Assets
import {colors, assets} from '../components/constants';

const ExerciseActiveCardModel = () => {
  return (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <View style={style.cardContainer}>
        {/* Exercise Titile */}
        <View
          className="space-x-6"
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={style.exerciseTitleStyle}>
            {getExerciseName(exercise.id)}
          </Text>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Image source={assets.icn_remove} />
          </TouchableOpacity>
        </View>

        {/* <SETsController indicatorTitle={'Set'} /> */}
        <View style={style.containerStyle}>
          {/* inner set container */}
          <View style={style.innerContainerStyle}>
            {/* Number indicator */}
            <View style={style.numberIndicator}>
              <Text style={{color: colors.white}}>{set}</Text>
            </View>

            <Text style={style.middleTextStyle}>Sets</Text>

            {/* plus - min buttons */}
            <View style={{flexDirection: 'row'}} className="space-x-10">
              <TouchableOpacity
                onPress={() => {
                  minSet();
                }}>
                <Image source={assets.icn_min} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => addSet()}>
                <Image source={assets.icn_add} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Dividor */}
        <View
          style={{
            borderWidth: 1,
            width: 300,
            borderColor: colors.secondaryow,
          }}
        />
      </View>
    </Modal>
  );
};

export default ExerciseActiveCardModel;

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
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  numberIndicator: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.secondaryow,
    width: 80,
    height: 29,
  },
  middleTextStyle: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 24.5,
  },
});
