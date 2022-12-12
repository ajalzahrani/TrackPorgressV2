import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from '../components/constants';

// Store
import useStore from '../store/useStore';

const ExerciseSelectRow = ({item}) => {
  const exercises = useStore(s => s.currentWorkout.exercises);
  const addNewExerciseWorkout = useStore(s => s.addNewExerciseWorkout);
  const [isSelected, setIsSelected] = useState(false);
  const [preSelected, setPreSelected] = useState(false);

  const handlePreSelect = () => {
    exercises?.find(exer => {
      if (exer.id === item.id) {
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
    <View style={style.ExerciseRow}>
      <Text style={style.exerciseTitleStyle}>{item.title}</Text>
      <View className="flex-row space-x-2 justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            setIsSelected(!isSelected);
            addNewExerciseWorkout(item.id);
          }}>
          <View
            style={{
              backgroundColor: isSelected ? colors.secondary : colors.primary,
            }}
            className="p-4 rounded-full"></View>
        </TouchableOpacity>
        <Image source={assets.icn_edit} />
      </View>
    </View>
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
});

export default ExerciseSelectRow;
