import {View, SafeAreaView} from 'react-native';
import React from 'react';

import ProfileTitle from '../components/ProfileTitle';
import CardInformation from '../components/CardInformation';

const SettingsScreen = () => {
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View className="mt-10 ml-12">
        <ProfileTitle />
      </View>
      <View className="px-5 mt-10">
        <CardInformation />
      </View>
      <View className="px-5 mt-2">
        <CardInformation />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
