import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

// Assets
import {colors, assets} from './constants';

const ExerciseActiveCard = ({exername, id}) => {
  return (
    <View style={style.cardContainer}>
      <View className="flex-col space-y-2">
        <Text style={style.workoutTitle}>
          ID: {id} {exername}
        </Text>
        <Text className="text-white text-lg">1:30 s</Text>
      </View>
      <View style={style.editContainerStyle} className="space-x-2">
        <TouchableOpacity onPress={() => {}}>
          <Image source={assets.icn_add} />
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
