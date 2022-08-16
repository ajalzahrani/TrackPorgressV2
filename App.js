/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Icons
import {
  HomeIcon,
  TableIcon,
  ChartPieIcon,
  AdjustmentsIcon,
} from 'react-native-heroicons/outline';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Screens
import HomeScreen from './screens/HomeScreen';
import SettingsScreen from './screens/SettingsScreen';
import StatScreen from './screens/StatScreen';
import ScheduleScreen from './screens/ScheduleScreen';

// TailwindCSS
import {TailwindProvider} from 'tailwindcss-react-native';

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <Tab.Navigator>
          <Tab.Screen
            name="home"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({}) => {
                return <HomeIcon />;
              },
            }}
          />
          <Tab.Screen
            name="schedule"
            component={ScheduleScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({}) => {
                return <TableIcon />;
              },
            }}
            t
          />
          <Tab.Screen
            name="stat"
            component={StatScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({}) => {
                return <ChartPieIcon />;
              },
            }}
          />
          <Tab.Screen
            name="settings"
            component={SettingsScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({}) => {
                return <AdjustmentsIcon />;
              },
            }}
          />
        </Tab.Navigator>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
