import {View, Text, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

const QuickStart = () => {
  const navigation = useNavigation();

  return (
    <View className="items-center">
      {/* FIXME: adjust the font and the button as the design */}
      <Text className="text-white mt-12 font-normal text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        malesuada pellentesque pharetra libero. Cras proin posuere risus, ut.
        Nunc nullam congue mi suspendisse rhoncus. Fermentum, bibendum tempus,
        ullamcorper.
      </Text>
      <TouchableOpacity
        onPress={() => {
          // console.log(store.getString('workouts'));
          navigation.navigate('ActiveScreen');
        }}>
        <LinearGradient
          className="py-3 px-20 rounded-full mt-10"
          colors={['#E10D60', '#FA3B89']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.75, 1]}
          // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
        >
          <Text className="text-base font-semibold text-white">
            Quick start
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default QuickStart;
