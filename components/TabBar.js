import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {colors, assets} from './constants';

// Screens
import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import StatScreen from '../screens/StatScreen';
import ScheduleScreen from '../screens/ScheduleScreen';

const Tab = createBottomTabNavigator();

const TabBar = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: style.tabBarStyle,
      }}>
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_home}
                resizeMode="contain"
                style={{
                  // FIXME: check the color
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="schedule"
        component={ScheduleScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_schedule}
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Schedule
              </Text>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="stat"
        component={StatScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_stat}
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Stat
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="settings"
        component={SettingsScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <View style={style.tabBarVewStyle}>
              <Image
                source={assets.icn_settings}
                resizeMode="contain"
                style={{
                  tintColor: focused ? colors.red : colors.greeny,
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? colors.red : colors.greeny,
                  ...style.tabBarTitleStyle,
                }}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const style = StyleSheet.create({
  tabBarStyle: {
    position: 'absolute',
    backgroundColor: colors.semiPrimary,
  },
  tabBarVewStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    top: 5,
  },
  tabBarIconStyle: {
    width: 20,
    height: 20,
  },
  tabBarTitleStyle: {
    marginTop: 5,
    fontSize: 11,
  },
});

export default TabBar;
