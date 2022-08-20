import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {}

const QuickStart = () => {
  return (
    <View className="items-center">
      {/* FIXME: adjust the font and the button as the design */}
      <Text className="text-white mt-12 font-normal text-sm text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
        malesuada pellentesque pharetra libero. Cras proin posuere risus, ut.
        Nunc nullam congue mi suspendisse rhoncus. Fermentum, bibendum tempus,
        ullamcorper.
      </Text>
      <TouchableOpacity>
        <LinearGradient
          className="py-3 px-20 rounded-full mt-10"
          start={{x: 1, y: 0}}
          end={{x: 0, y: 0}}
          colors={['#FA3B89', '#E10D60']}>
          <Text className="text-base font-semibold text-white">
            Quick start
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default QuickStart;
