import {Text, View, SafeAreaView, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {useGstore} from '../gstore';
import {useTranslation} from 'react-i18next';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import useStore from '../store/useStore';

// Components
import QuickStart from '../components/QuickStart';

const HomeScreen = () => {
  const navigation = useNavigation();
  const routines = useStore(state => state.routines);
  const currentRoutine = useStore(state => state.currentRoutine);
  const exercisesMaster = useStore(state => state.exercisesMaster);
  const sessions = useGstore(state => state.sessions);
  const {t} = useTranslation();

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
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
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
