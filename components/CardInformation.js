import {View, Text} from 'react-native';
import React from 'react';

const CardInformation = () => {
  return (
    <View className="bg-[#FFFFFF1A] px-5 py-4 placeholder-sky-300 rounded-lg">
      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">Gender</Text>
        <Text className="text-white text-base font-normal">Male</Text>
      </View>
      <View className="border-y border-solid border-[#FFFFFF33]" />

      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">Date of Birth</Text>
        <Text className="text-white text-base font-normal">02/02/2001</Text>
      </View>
      <View className="border-y border-solid border-[#FFFFFF33]" />
      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">Location</Text>
        <Text className="text-white text-base font-normal">Paris</Text>
      </View>
      <View className="border-y border-solid border-[#FFFFFF33]" />
      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">Email</Text>
        <Text className="text-white text-base font-normal">
          john@example.com
        </Text>
      </View>
    </View>
  );
};

export default CardInformation;
