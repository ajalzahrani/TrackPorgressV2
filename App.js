/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
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

// Navigation
import {NavigationContainer} from '@react-navigation/native';

// TabBar
import TabBar from './components/navigation/TabBar';

// TailwindCSS
import {TailwindProvider} from 'tailwindcss-react-native';

// Storage
import {ImplementDataStructure} from './components/database/ImplementDataStructure';

const App: () => Node = () => {
  useEffect(() => {
    ImplementDataStructure();
  });
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
