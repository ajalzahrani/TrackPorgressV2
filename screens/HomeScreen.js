import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useGstore} from '../gstore';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import useStore from '../store/useStore';

// assets
import {colors} from '../components/constants';

// Components
import QuickStart from '../components/QuickStart';
import PressableButton from '../components/PressableButton';

const HomeScreen = () => {
  const navigation = useNavigation();
  const routines = useStore(state => state.routines);
  const currentRoutine = useStore(state => state.currentRoutine);
  const exercisesMaster = useStore(state => state.exercisesMaster);
  const sessions = useGstore(state => state.sessions);
  const {t} = useTranslation();

  return (
    <SafeAreaView style={styles.safeViewStyle}>
      <View className="items-center p-16">
        <Text className="mt-1 font-semibold text-4xl text-white">
          {t('home.title')}!
        </Text>
        <Image
          className="mt-12"
          source={require('../asset/icn_background.png')}
        />
        {/* <QuickStart /> */}
        <View className="items-center">
          {/* FIXME: adjust the font and the button as the design */}

          <Text className="text-white mt-12 font-normal text-sm text-center">
            {t('home.introduction')}
          </Text>

          <PressableButton
            title={t('home.btnQuickStart')}
            onPress={() => console.log(JSON.stringify(routines))}
            style={{paddingHorizontal: 40}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
});
