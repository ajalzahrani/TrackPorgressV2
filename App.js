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

// Database
import {createDatebase, createDatabaseTables} from './components/database';

// Navigation
import {NavigationContainer} from '@react-navigation/native';

// TabBar
import TabBar from './components/navigation/TabBar';

// TailwindCSS
import {TailwindProvider} from 'tailwindcss-react-native';

const App: () => Node = () => {
  createDatebase();
  createDatabaseTables();
  return (
    <NavigationContainer>
      <TailwindProvider>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        <TabBar />
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
