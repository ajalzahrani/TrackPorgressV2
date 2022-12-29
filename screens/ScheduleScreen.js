import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  TextInput,
  Pressable,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';

// Components
import CalenderRow from '../components/CalenderRow';
import WorkoutCard from '../components/WorkoutCard';

// Assets
import {colors, assets} from '../components/constants';

// Store
import useStore from '../store/useStore';

import {useIsFocused, useNavigation} from '@react-navigation/native';

const ScheduleScreen = () => {
  // FIXME: workout name should'nt take all the space in pre-list of workout
  // FIXME: Auto select new added workout.
  const workouts = useStore(s => s.workouts);
  const scheduledWorkout = useStore(s => s.scheduledWorkout);
  const addWorkoutDay = useStore(s => s.addWorkoutDay);
  const currentDay = useStore(s => s.currentDay);
  const unselectCurrentDay = useStore(s => s.unselectCurrentDay);
  const unselectCurrentWorkout = useStore(s => s.unselectCurrentWorkout);
  const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);
  const selectScheduledWorkout = useStore(s => s.selectScheduledWorkout);
  const addNewWorkout = useStore(s => s.addNewWorkout);
  const saveRoutine = useStore(s => s.saveRoutine);
  const compareRoutinesObj = useStore(s => s.compareRoutinesObj);
  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Save changes ?</Text>

            <View style={{flexDirection: 'row'}}>
              <Pressable
                style={[style.button, style.buttonClose, {marginRight: 10}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  saveRoutine();
                  navigation.navigate('RoutineScreen');
                }}>
                <Text style={style.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[style.button, style.buttonClose, {marginRight: 10}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('RoutineScreen');
                }}>
                <Text style={style.textStyle}>No</Text>
              </Pressable>
              <Pressable
                style={[style.button, style.buttonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text style={style.textStyle}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
      <View>
        <View style={style.goBackStyle}>
          <TouchableOpacity
            onPress={() => {
              if (compareRoutinesObj() === false) {
                setModalVisible(!modalVisible);
              } else {
                navigation.navigate('RoutineScreen');
              }
            }}>
            <Image source={assets.icn_goback} />
          </TouchableOpacity>
          <TouchableOpacity
            className="flex-row flex-1 space-x-2 items-center justify-end mt-2 mr-2"
            onPress={() => {
              addNewWorkout('');
              navigation.navigate('WorkoutScreen');
            }}>
            <Image source={assets.icn_plus} style={{}} />
            <Text className="text-red-500 text-base">
              {t('schedule.addNewWorkout')}
            </Text>
          </TouchableOpacity>
        </View>

        <CalenderRow />
      </View>
      <View style={style.workoutContainerStyle}>
        {scheduledWorkout?.title ? (
          <>
            <View className="flex-row items-center space-x-5">
              <Text style={style.workoutTitleStyle}>
                {scheduledWorkout.title}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  selectCurrentWorkout(scheduledWorkout.id);
                  navigation.navigate('WorkoutScreen');
                }}>
                <Image source={assets.icn_edit} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  unselectCurrentDay(currentDay.id);
                  unselectCurrentWorkout();
                }}>
                <Image source={assets.icn_remove} />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => {
                // console.log(store.getString('workouts'));
                navigation.navigate('ActiveScreen', {
                  workoutObject: scheduledWorkout,
                });
              }}>
              <LinearGradient
                style={style.touchableOpacityStartStyle}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#FA3B89', '#E10D60']}>
                <View className="flex-row justify-center items-center space-x-2">
                  <Image source={assets.icn_start} />
                  <Text className="text-base font-semibold text-white">
                    Start
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-yellow-200">
            {t('schedule.addNewWorkoutOrChoose')}
          </Text>
        )}
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">{t('schedule.preListOfWorkouts')}</Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {workouts?.map(workout => (
              <TouchableOpacity
                key={workout.id}
                onPress={() => {
                  // console.log(workout.id);
                  console.log(currentDay.id);
                  selectScheduledWorkout(workout.id);
                  addWorkoutDay(currentDay.id);
                }}>
                <WorkoutCard id={workout.id} title={workout.title} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  preWorkoutListContainerStyle: {
    marginTop: 51,
  },
  workoutContainerStyle: {
    display: 'flex',
    flexdirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    gap: 30,
    marginTop: 56,
  },
  goBackStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
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

  // modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInput: {
    // height: 40,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    borderWidth: 0.2,
  },
});

export default ScheduleScreen;
