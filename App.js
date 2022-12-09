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
import TabBar from './components/navigation/TabBar';

// TailwindCSS
import {TailwindProvider} from 'tailwindcss-react-native';

// Storage
import {ImplementDataStructure} from './components/database/ImplementDataStructure';

// Translation
import i18n from './Translation/i18n';
import {I18nextProvider} from 'react-i18next';

const App: () => Node = () => {
  useEffect(() => {
    ImplementDataStructure();
  }, []);
  return (
    <NavigationContainer>
      <TailwindProvider>
        <StatusBar
          backgroundColor="transparent"
          barStyle="light-content"
          translucent={true}
        />
        <I18nextProvider>
          <TabBar />
        </I18nextProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
