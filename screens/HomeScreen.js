import {Text, View, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {useGstore} from '../gstore';

// Components
import QuickStart from '../components/QuickStart';

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View className="items-center p-16">
        <Text className="mt-1 font-semibold text-4xl text-white">Welcome!</Text>
        <Image
          className="mt-12"
          source={require('../asset/icn_background.png')}
        />
        <QuickStart />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
