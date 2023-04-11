import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';

// Assets
import {colors, assets} from 'src/assets';

// Store
import useStore from '../../../../store/store.bak/useStore';
import useRoutineStore from 'src/store/useRoutineStore';
import {workoutType} from 'src/components/shared/globalTypes';

// Navigation
import {useNavigation} from '@react-navigation/native';
import {RoutineScreenNavigationProp} from '../RoutineScreen';
type WorkoutCardType = {
  routineId: string;
  workout: workoutType;
};

const WorkoutCard = ({routineId, workout}: WorkoutCardType) => {
  // const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);
  const navigation = useNavigation<RoutineScreenNavigationProp>();

  return (
    <View style={style.cardContainer}>
      <Text style={style.workoutTitle}>{workout.title}</Text>
      <View
        style={style.editContainerStyle}
        // className="space-x-2"
      >
        <TouchableOpacity onPress={() => {}}>
          <Image source={assets.icn_goforward} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            // selectCurrentWorkout(workout.id);
            navigation.navigate('WorkoutScreen', {
              routineId: routineId,
              workout: workout,
            });
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
