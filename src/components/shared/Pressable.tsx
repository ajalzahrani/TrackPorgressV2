import {
  StyleSheet,
  Text,
  Pressable,
  ViewStyle,
  GestureResponderEvent,
  View,
} from 'react-native';
import React from 'react';
// FIXME: add active status

type propType = {
  title: string;
  onPress?: null | ((event: GestureResponderEvent) => void) | undefined;
  iconSource?: string;
  disabled?: boolean;
  children?: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};
function PressableButton({
  title,
  onPress,
  iconSource,
  disabled,
  children,
  style,
}: propType) {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      // style={({pressed, disabled}) => [
      //   style || {},
      //   {opacity: pressed ? 0.5 : 1},
      //   {opacity: disabled ? 0.5 : 1},
      // ]}
      style={({pressed, disabled}: any) => [
        style || {},
        {opacity: disabled ? 0.5 : pressed ? 0.8 : 1.0},
      ]}>
      <Text style={styles.text}>{title}</Text>
      <View style={styles.indicatorStyle}>{children}</View>
    </Pressable>
  );
}

export default PressableButton;

const styles = StyleSheet.create({
  text: {
    // fontSize: 16,
    // fontWeight: '700',
  },
  indicatorStyle: {
    position: 'absolute',
  },
});
