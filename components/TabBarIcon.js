import {View, Text, Image} from 'react-native';
import React from 'react';

const TabBarIcon = props => {
  const name = 'schedule';
  const isFocused = 'green';

  return (
    <View>
      <Image
        // source={require('../asset/icn_' + isFocused
        //   ? 'red'
        //   : 'green' + '_' + label + '.png')}
        source={require('../asset/icn_' +
          isFocused +
          '_' +
          props.lableProp +
          '.png')}
      />
      <Text>{props.lableProp}</Text>
    </View>
  );
};

export default TabBarIcon;
