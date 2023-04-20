import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import CardExerciseDetails from './CardExerciseDetails';

// Assets
import {colors, assets} from 'src/assets';

import {
  exerciseMasterType,
  exercisesType,
} from 'src/components/shared/globalTypes';
import useRoutineStore from 'src/store/useRoutineStore';

type ExerciseSelectRowType = {
  routineId: string;
  workoutId: string;
  exerciseRow: exerciseMasterType;
  exercisesSelected: exercisesType[];
};

const ExerciseSelectRow = ({
  routineId,
  workoutId,
  exerciseRow,
  exercisesSelected,
}: ExerciseSelectRowType) => {
  const updateExercises = useRoutineStore(s => s.updateExercises);
  const [isSelected, setIsSelected] = useState(false);
  const [preSelected, setPreSelected] = useState(false);
  const [explore, setIsExplore] = useState(false);

  const handlePreSelect = () => {
    exercisesSelected?.find(exercise => {
      if (exercise.id === exerciseRow.id) {
        setIsSelected(true);
      }
    });
    setPreSelected(true);
  };

  useEffect(() => {
    if (!preSelected) {
      handlePreSelect();
    }
  }, []);

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsExplore(!explore)}
        // style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}
      >
        <View style={style.ExerciseRow}>
          <Text style={style.exerciseTitleStyle}>{exerciseRow.name}</Text>
          <TouchableOpacity
            onPress={() => {
              setIsSelected(!isSelected);
              updateExercises(routineId, workoutId, exerciseRow.id);
            }}>
            <View
              style={[
                {
                  backgroundColor: isSelected
                    ? colors.secondary
                    : colors.primary,
                },
                {padding: 12, borderRadius: 150 / 2},
              ]}></View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      {/* {explore && <CardExerciseDetails exercise={exerciseRow} />} */}
    </>
  );
};

const style = StyleSheet.create({
  ExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  exerciseTitleStyle: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },
  exerciseDetails: {
    flex: 1,
    flexWrap: 'wrap',
    color: colors.white,
    fontWeight: '200',
    fontSize: 16,
    lineHeight: 20,
  },
});

export default ExerciseSelectRow;
