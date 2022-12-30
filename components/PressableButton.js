import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

function PressableButton({label, onPress, iconSource}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.linearGradientStyle || {},
        {opacity: pressed ? 0.5 : 1},
      ]}>
      <LinearGradient
        style={styles.linearGradientStyle}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={['#FA3B89', '#E10D60']}>
        <View className="flex-row justify-center items-center space-x-2">
          <Text className="text-base font-semibold text-white">{label}</Text>
          <Image source={iconSource} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

export default PressableButton;

const styles = StyleSheet.create({
  linearGradientStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
    paddingVertical: 10,
    borderRadius: 100,
  },
});
