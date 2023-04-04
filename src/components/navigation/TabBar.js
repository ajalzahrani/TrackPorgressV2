import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

// Tab Navigator
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

// Stack Navigator
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const ScheduleStack = createNativeStackNavigator();

// Screens
import HomeScreen from '../../screens/HomeScreen';
import ScheduleScreen from '../../screens/ScheduleScreen';
import WorkoutScreen from '../../screens/WorkoutScreen';
import StatScreen from '../../screens/StatScreen';
import SettingsScreen from '../../screens/SettingsScreen';
import ExerciseScreen from '../../screens/ExerciseScreen';
import ActiveScreen from '../../src/screen/active/ActiveScreen';
import VReportScreen from '../../screens/VReportScreen';
import RoutineScreen from '../../screens/RoutineScreen';
import RoutineFormScreen from '../../screens/RoutineFormScreen';

// componetns
import {colors, assets} from '../constants';

const ScheduleStackScreen = () => {
  return (
    <ScheduleStack.Navigator screenOptions={{headerShown: false}}>
      <ScheduleStack.Screen name="RoutineScreen" component={RoutineScreen} />
      <ScheduleStack.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <ScheduleStack.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <ScheduleStack.Screen
        name="ActiveScreen"
        component={ActiveScreen}
        options
      />
      <ScheduleStack.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <ScheduleStack.Screen
        name="VReportScreen"
        component={VReportScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <ScheduleStack.Screen
        name="RoutineFormScreen"
        component={RoutineFormScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </ScheduleStack.Navigator>
  );
};

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
        component={ScheduleStackScreen}
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
