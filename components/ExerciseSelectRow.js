import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

const ExerciseSelectRow = ({item, selectExercise, handleExerciseSelection}) => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <View style={style.ExerciseRow}>
      <Text style={style.exerciseTitleStyle}>{item.title}</Text>
      <View className="flex-row space-x-2 justify-center items-center">
        <TouchableOpacity
          onPress={() => {
            setIsSelected(!isSelected);
            // console.log(item.id);
            // Logic how to pass props throw navigation
            // use the props here.
            // selectExercise(item.id);
            handleExerciseSelection(item.id);
          }}>
          <View
            style={{
              backgroundColor: isSelected ? colors.red : colors.primary,
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
