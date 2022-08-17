import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

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
                source={require('../asset/icn_red_home.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? 'red' : '#B3BBD4',
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : '#B3BBD4',
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
                source={require('../asset/icn_green_schedule.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? 'red' : '#B3BBD4',
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : '#B3BBD4',
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
                source={require('../asset/icn_green_stat.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? 'red' : '#B3BBD4',
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : '#B3BBD4',
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
                source={require('../asset/icn_green_settings.png')}
                resizeMode="contain"
                style={{
                  tintColor: focused ? 'red' : '#B3BBD4',
                  ...style.tabBarIconStyle,
                }}
              />
              <Text
                style={{
                  color: focused ? 'red' : '#B3BBD4',
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
    backgroundColor: '#1A294F',
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
