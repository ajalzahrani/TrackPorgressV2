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

// TabBar
import TabBar from './components/TabBar';

// TailwindCSS
import {TailwindProvider} from 'tailwindcss-react-native';

const App: () => Node = () => {
  return (
    <NavigationContainer>
      <TailwindProvider>
        <TabBar />
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
