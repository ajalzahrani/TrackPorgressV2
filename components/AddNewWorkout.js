import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';

const AddNewWorkout = () => {
  return (
    <TouchableOpacity className="flex-row space-x-2 items-center justify-end mt-2 mr-2">
      <Image source={require('../asset/icn_plus.png')} style={{}} />
      <Text className="text-red-500 text-base">Add new workout</Text>
    </TouchableOpacity>
  );
};

export default AddNewWorkout;
