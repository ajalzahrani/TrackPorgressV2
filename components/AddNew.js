import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {assets, colors} from './constants';

const AddNew = ({title, navigateTo}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex-row flex-1 space-x-2 items-center justify-end mt-2 mr-2"
      onPress={() => {
        navigation.navigate(navigateTo.to);
      }}>
      <Image source={assets.icn_plus} style={{}} />
      <Text className="text-red-500 text-base">{title}</Text>
    </TouchableOpacity>
  );
};

export default AddNew;
