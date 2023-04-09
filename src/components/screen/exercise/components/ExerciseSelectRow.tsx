import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import CardExerciseDetails from './CardExerciseDetails';

// Assets
import {colors, assets} from '../components/constants';

// Store
import useStore from '../../../../store/store.bak/useStore';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import PressableButton from '../../../shared/PressableButton';

const ExerciseSelectRow = ({item}) => {
  const exercises = useStore(s => s.currentWorkout.exercises);
  const addNewExerciseWorkout = useStore(s => s.addNewExerciseWorkout);
  const [isSelected, setIsSelected] = useState(false);
  const [preSelected, setPreSelected] = useState(false);
  const [explore, setIsExplore] = useState(false);

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
    <>
      <Pressable
        onPress={() => setIsExplore(!explore)}
        style={({pressed}) => [{opacity: pressed ? 0.5 : 1}]}>
        <View style={style.ExerciseRow}>
          <Text style={style.exerciseTitleStyle}>{item.name}</Text>
          <View className="flex-row space-x-2 justify-center items-center">
            <Image source={explore ? assets.icn_remove : assets.icn_add} />
            <TouchableOpacity
              onPress={() => {
                setIsSelected(!isSelected);
                addNewExerciseWorkout(item.id);
              }}>
              <View
                style={{
                  backgroundColor: isSelected
                    ? colors.secondary
                    : colors.primary,
                }}
                className="p-4 rounded-full"></View>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      {explore && <CardExerciseDetails exercise={item} />}
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
