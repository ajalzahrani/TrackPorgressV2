import {Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {assets} from './constants';

const AddNew = ({title, navigateTo, options, Schedule_Insert}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row flex-1 space-x-2 items-center justify-end mt-2 mr-2"
      onPress={() => {
        // Insert new schedule record with temp workoutname
        // Schedule_Insert();
        // Logic how to pass props throw navigation >> continue to next component
        // pass the props object throw navigation params in this case to exerciseScreen
        navigation.navigate(navigateTo.to, {
          // FIXME: Change setExercise to be generic name for other components use
          setExercises: options,
        });
      }}>
      <Image source={assets.icn_plus} style={{}} />
      <Text className="text-red-500 text-base">{title}</Text>
    </TouchableOpacity>
  );
};

export default AddNew;
