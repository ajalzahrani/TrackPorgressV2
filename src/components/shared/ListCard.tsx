import {StyleSheet, View, ViewStyle} from 'react-native';
import React from 'react';
import {colors} from '../../../assets';

type propType = {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
};

const ListCard = ({children, style}: propType) => {
  return (
    <View style={[styles.container, styles.shadowProp, style]}>{children}</View>
  );
};

export default ListCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    marginTop: 20,
    padding: 10,
    borderRadius: 8,
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
