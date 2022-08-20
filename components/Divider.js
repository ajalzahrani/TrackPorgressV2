import {View, Text} from 'react-native';
import React from 'react';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

const Divider = () => {
  return (
    <View>
      <View
        style={{
          borderWidth: 1,
          width: '80%',
          borderColor: colors.secondaryow,
        }}
      />
    </View>
  );
};

export default Divider;
