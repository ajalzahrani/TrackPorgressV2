import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  Pressable,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';

// Assets
import {colors, assets} from '../components/constants';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Store
import useStore from '../store/useStore';

// Componenets
import RoutineCard from '../components/RoutineCard';
import RoutineFormSheetModal from './RoutineFormScreen';
import PressableButton from '../components/PressableButton';

const RoutineScreen = () => {
  const routines = useStore(s => s.routines);
  const selectCurrentRoutine = useStore(s => s.selectCurrentRoutine);
  const navigation = useNavigation();

  const {t} = useTranslation();

  // useEffect(() => {
  //   setModalVisible(true);
  // }, []);

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 10,
            paddingHorizontal: 20,
            paddingVertical: 15,
            borderRadius: 10,
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{fontSize: 30, fontWeight: '700', color: colors.white}}>
              {t('routines.routines')}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                selectCurrentRoutine(-1);
                navigation.navigate('RoutineFormScreen');
              }}>
              <Image source={assets.icn_add} />
            </TouchableOpacity>
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{paddingBottom: 72}}
          style={{marginTop: 20}}>
          {routines?.map((item, i) => (
            <View key={i} style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                style={{flex: 1}}
                onPress={() => {
                  // console.log(JSON.stringify(item));
                  navigation.navigate('ScheduleScreen');
                  selectCurrentRoutine(item.id);
                }}>
                <RoutineCard id={item.id} title={item.title} />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <PressableButton
          label={t('routines.printRoutines')}
          onPress={() => console.log(JSON.stringify(routines))}
        />
      </View>
    </SafeAreaView>
  );
};

export default RoutineScreen;

const style = StyleSheet.create({
  preWorkoutListContainerStyle: {
    marginTop: 51,
  },
  workoutContainerStyle: {
    display: 'flex',
    flexdirection: 'column',
    alignItems: 'center',
    padding: 0,
    gap: 30,
    marginTop: 56,
  },
  workoutTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 45,
    textAlign: 'center',
    color: colors.white,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 24.5,
  },
  startTextStyle: {
    fontWeight: 600,
    fontSize: 16,
    lineHeight: 24,
  },
  titleButtonContainerStyle: {
    marginHorizontal: 72,
  },
});
