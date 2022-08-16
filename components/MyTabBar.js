import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import TabBarIcon from './TabBarIcon';

const MyTabBar = ({state, descriptors, navigation}) => {
  return (
    <View className="flex-row pt-10 mb-10 items-center justify-center">
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 item-center justify-center flex-row">
            <View className="">
              {/* <TabBarIcon lableProp={label} isFocusedProp={isFocused} /> */}
              <TabBarIcon lableProp={label} isFocusedProp={isFocused} />
              {/* <Image source={require('../asset/icn_red_home.png')} />
              <Text style={{color: isFocused ? '#673ab7' : '#222'}}>
                {label}
              </Text> */}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default MyTabBar;
