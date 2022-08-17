import {View, Text, Image} from 'react-native';
import React from 'react';

const ProfileTitle = () => {
  return (
    <View className="flex-row items-center space-x-5">
      <Image
        source={require('../asset/personalpic.png')}
        style={{
          //resizeMode: 'contain',
          width: 100,
          height: 100,
          borderRadius: 100,
          backgroundColor: '#D9D9D9',
        }}
      />
      <View>
        <Text className="text-white font-semibold text-2xl">John Wick</Text>
        <Text className="text-white text-baes font-normal">@johnWick</Text>
      </View>
    </View>
  );
};

export default ProfileTitle;
