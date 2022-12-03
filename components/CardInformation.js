import {View, Text} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

const CardInformation = () => {
  const {t} = useTranslation();

  return (
    <View className="bg-[#FFFFFF1A] px-5 py-4 placeholder-sky-300 rounded-lg">
      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">
          {t('settings.gender')}
        </Text>
        <Text className="text-white text-base font-normal">Male</Text>
      </View>
      <View className="border-y border-solid border-[#FFFFFF33]" />

      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">
          {t('settings.dob')}
        </Text>
        <Text className="text-white text-base font-normal">02/02/2001</Text>
      </View>
      <View className="border-y border-solid border-[#FFFFFF33]" />
      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">
          {t('settings.location')}
        </Text>
        <Text className="text-white text-base font-normal">Paris</Text>
      </View>
      <View className="border-y border-solid border-[#FFFFFF33]" />
      <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
        <Text className="text-white text-sm font-medium">
          {t('settings.email')}
        </Text>
        <Text className="text-white text-base font-normal">
          john@example.com
        </Text>
      </View>
    </View>
  );
};

export default CardInformation;
