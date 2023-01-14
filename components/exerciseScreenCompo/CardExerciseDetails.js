import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native-svg';

const CardExerciseDetails = ({exercise}) => {
  const {t} = useTranslation();

  return (
    <View className="bg-[#FFFFFF1A] px-5 py-4 placeholder-sky-300 rounded-lg">
      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">
          {t('exercise.bodyPart')}
        </Text>
        <Text className="text-white text-base font-normal">
          {exercise.bodyPart}
        </Text>
      </View>

      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">
          {t('exercise.equipment')}
        </Text>
        <Text className="text-white text-base font-normal">
          {exercise.equipment}
        </Text>
      </View>

      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">
          {t('exercise.target')}
        </Text>
        <Text className="text-white text-base font-normal">
          {exercise.target}
        </Text>
      </View>

      <Text>{exercise.gifUrl}</Text>

      <Image
        style={{width: '100%', height: '80%'}}
        source={{
          uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220221170632/ezgifcomgifmaker1.gif',
        }}
      />

      <Image
        style={{
          width: 51,
          height: 51,
          resizeMode: 'contain',
        }}
        source={{
          uri: exercise.gifUrl,
        }}
      />
    </View>
  );
};

export default CardExerciseDetails;

const styles = StyleSheet.create({});
