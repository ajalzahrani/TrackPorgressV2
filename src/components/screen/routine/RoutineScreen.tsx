import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';

// Assets
import {colors, assets} from 'src/assets';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {ScheduleStackRootParamList} from 'src/components/navigation/ScheduleStack';
export type scheduleStackProp = NativeStackNavigationProp<
  ScheduleStackRootParamList,
  'RoutineFormScreen'
>;

// Store
import useStore from 'src/store/slice.bak/useStore';

// Componenets
import RoutineCard from './components/RoutineCard';
import {ScreenContainer, PressableButton} from 'src/components/shared';

const RoutineScreen = () => {
  const routines = useStore(s => s.routines);
  const selectCurrentRoutine = useStore(s => s.selectCurrentRoutine);
  const navigation = useNavigation<scheduleStackProp>();

  const {t} = useTranslation();

  return (
    <ScreenContainer>
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
          title={t('routines.printRoutines')}
          onPress={() => console.log(JSON.stringify(routines))}
        />
      </View>
    </ScreenContainer>
  );
};

export default RoutineScreen;

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  preWorkoutListContainerStyle: {
    marginTop: 51,
  },
  workoutContainerStyle: {
    display: 'flex',
    flexDirection: 'column',
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
