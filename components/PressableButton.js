import {StyleSheet, Text, View, Pressable, Image} from 'react-native';
import React, {useCallback, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {colors} from './constants';

function PressableButton({title, onPress, iconSource, style}) {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.linearGradientStyle || {},
        {opacity: pressed ? 0.5 : 1},
      ]}>
      <LinearGradient
        style={[styles.linearGradientStyle, style]}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 0}}
        colors={colors.linerGradient2}>
        <View className="flex-row justify-center items-center space-x-2">
          <Text style={styles.text}>{title}</Text>
          <Image source={iconSource} />
        </View>
      </LinearGradient>
    </Pressable>
  );
}

// className="text-base font-semibold text-black"

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
  text: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.black,
  },
});
