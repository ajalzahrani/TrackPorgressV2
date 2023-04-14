import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import ExerciseApi from '../../../../assets/database/ExerciseApiShort.json';

// Assets
import {colors, assets} from 'src/assets';

// components
import SETsController from './SETsController';

// Store
import {
  exerciseMasterType,
  exercisesType,
} from 'src/components/shared/globalTypes';
import useExerciseStore from 'src/store/useExerciseMaster';
import useRoutineStore from 'src/store/useRoutineStore';

type ExerciseCardProp = {
  routineId: string;
  workoutId: string;
  exercise: exercisesType;
};
const ExerciseCard: React.FC<ExerciseCardProp> = ({
  routineId,
  workoutId,
  exercise,
}) => {
  const exercisesMaster = useExerciseStore(s => s.exerciseMaster);
  const deleteExercise = useRoutineStore(s => s.deleteExercise);
  const addFreq = useRoutineStore(s => s.addFreq);
  const [set, setSet] = useState(exercise.freq.length);

  const addSet = () => {
    setSet(set + 1);
    exercise.freq.length = set; // link set count with any update
  };

  const minSet = () => {
    if (set === 0) {
      setSet(0);
      exercise.freq.length = 0;
    } else {
      setSet(set - 1);
      exercise.freq.length = set - 1; // link set count with any update
    }
  };

  const handleAddFreq = (freq: number[]) => {
    addFreq(routineId, workoutId, exercise.id, freq);
  };

  const RepControllerComponent = () => {
    const rows = [];
    for (let i = 0; i < set; i++) {
      rows.push(
        <SETsController
          key={i}
          freq={exercise.freq}
          index={i}
          addFreq={handleAddFreq}
          indicatorTitle={'Set ' + (i + 1)}
        />,
      );
    }
    return <>{rows}</>;
  };

  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = (id: string) => {
    let exername = exercisesMaster.filter(element => {
      return element.id === id;
    });
    return exername[0].name;
  };

  return (
    <View style={style.cardContainer}>
      {/* Exercise Titile */}
      <View
        // className="space-x-6"
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={style.exerciseTitleStyle}>
          {getExerciseName(exercise.id)}
        </Text>
        <TouchableOpacity
          onPress={() => {
            deleteExercise(routineId, workoutId, exercise.id);
          }}>
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
      {RepControllerComponent()}
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
  editContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default ExerciseCard;
