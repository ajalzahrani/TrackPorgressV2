import {Text, View, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {useGstore} from '../gstore';
import {useTranslation} from 'react-i18next';

// Components
import QuickStart from '../components/QuickStart';

const HomeScreen = () => {
  const {t} = useTranslation();
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View className="items-center p-16">
        <Text className="mt-1 font-semibold text-4xl text-white">
          {t('home.title')}!
        </Text>
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
