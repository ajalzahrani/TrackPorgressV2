import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';

// Navigation
import {NavigationContainer} from '@react-navigation/native';
import Router from './src/components/navigation/Router';

// TailwindCSS
import {TailwindProvider} from 'tailwindcss-react-native';

// Storage
import {ImplementDataStructure} from './src/assets/database/ImplementDataStructure';

// Translation
import {I18nextProvider} from 'react-i18next';
import {Text, View} from 'react-native';

const App = () => {
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
        {/* <View>
          <Text>Hello, World</Text>
        </View> */}
        {/* <I18nextProvider i18n={undefined}> */}
        <Router />
        {/* </I18nextProvider> */}
      </TailwindProvider>
    </NavigationContainer>
  );
};

export default App;
