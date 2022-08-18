import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React from 'react';

import {colors, assets, workoutData} from './constants';

const WorkoutCard = () => {
  return (
    <View style={style.cardContainer}>
      <Text style={style.workoutTitle}>Pushup workout</Text>
      <View style={style.editContainerStyle} className="space-x-2">
        <TouchableOpacity style={style.touchableOpacityArrowStyle}>
          <Image source={assets.icn_rightarrow} />
        </TouchableOpacity>
        <TouchableOpacity>
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
    padding: 8,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },
});

export default WorkoutCard;
