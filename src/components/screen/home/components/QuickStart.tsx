import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import {useGstore} from '../../../../../gstore';
import useStore from '../../../../store/store.bak/useStore';
import {store} from '../../../../Store';

import {colors} from './constants';
import {useTranslation} from 'react-i18next';

const QuickStart = () => {
  const navigation = useNavigation();
  const routines = useStore(state => state.routines);
  const currentRoutine = useStore(state => state.currentRoutine);
  const exercisesMaster = useStore(state => state.exercisesMaster);
  const sessions = useGstore(state => state.sessions);
  const {t} = useTranslation();

  return (
    <View className="items-center">
      {/* FIXME: adjust the font and the button as the design */}

      <Text className="text-white mt-12 font-normal text-sm text-center">
        {t('home.introduction')}
      </Text>

      <TouchableOpacity
        onPress={() => {
          // const exercises = JSON.parse(store.getString('exercises'));
          // const workouts = JSON.parse(store.getString('workouts'));
          // console.log(JSON.stringify(sessions));
          console.log(JSON.stringify(routines));
        }}>
        <LinearGradient
          className="py-3 px-20 rounded-full mt-10"
          colors={['#E10D60', '#FA3B89']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.75, 1]}
          // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
        >
          <Text className="text-base font-semibold text-white">
            {t('home.btnQuickStart')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default QuickStart;
