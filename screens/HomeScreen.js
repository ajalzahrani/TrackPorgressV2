import {
  Text,
  View,
  StatusBar,
  Button,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';

// Components
import TodaysQuickStartCard from '../components/TodaysQuickStartCard';

const HomeScreen = () => {
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View className="items-center p-16">
        <Text className="mt-8 font-semibold text-4xl text-white">Welcome!</Text>
        <Image
          className="mt-14"
          source={require('../asset/icn_background.png')}
        />
        <Text
          style={{fontFamily: 'poppins'}}
          className="text-white mt-12 font-normal text-sm text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          malesuada pellentesque pharetra libero. Cras proin posuere risus, ut.
          Nunc nullam congue mi suspendisse rhoncus. Fermentum, bibendum tempus,
          ullamcorper.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
