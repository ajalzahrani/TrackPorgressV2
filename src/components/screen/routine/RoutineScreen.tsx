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
  Alert,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useRef} from 'react';

// Components
import CalenderRow from './components/CalenderRow';
import WorkoutCard from './components/WorkoutCard';
import {PressableButton} from 'src/components/shared';
import compareObjects from 'src/components/shared/compareObjects';

// Assets
import {colors, assets} from 'src/assets';

// Store
import useStore from '../../../store/store.bak/useStore';

// Navigation
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import useRoutineStore from 'src/store/useRoutineStore';

type RoutineScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'RoutineScreen'
>;

export type RoutineScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'RoutineScreen'
>;

type RoutineScreenProps = {
  route: RoutineScreenRouteProp;
  navigation: RoutineScreenNavigationProp;
};

const RoutineScreen: React.FC<RoutineScreenProps> = ({route, navigation}) => {
  // FIXME: workout name should'nt take all the space in pre-list of workout
  // FIXME: Auto select new added workout.
  // FIXME: Clicking on navigation button should prsiste configurations.

  const routine = route.params.routine;
  const routineRef = useRef(routine);
  const workoutId = useRoutineStore(s => s.workoutId);
  const setWorkoutId = useRoutineStore(s => s.setWorkoutId);
  const workout = routine.workouts.find(workout => workout.id === workoutId);

  // const scheduledWorkout = useStore(s => s.scheduledWorkout);
  // const addWorkoutDay = useStore(s => s.addWorkoutDay);
  // const currentDay = useStore(s => s.currentDay);
  // const unselectCurrentDay = useStore(s => s.unselectCurrentDay);
  // const unselectCurrentWorkout = useStore(s => s.unselectCurrentWorkout);
  // const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);
  // const selectScheduledWorkout = useStore(s => s.selectScheduledWorkout);
  // const addNewWorkout = useStore(s => s.addNewWorkout);
  // const saveRoutine = useStore(s => s.saveRoutine);
  // const compareRoutinesObj = useStore(s => s.compareRoutinesObj);

  const {t} = useTranslation();

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <SafeAreaView style={style.safeViewStyle}>
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
                  // saveRoutine();
                  navigation.navigate('RoutineListScreen', {name: ''});
                }}>
                <Text style={style.textStyle}>Yes</Text>
              </Pressable>
              <Pressable
                style={[style.button, style.buttonClose, {marginRight: 10}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  navigation.navigate('RoutineListScreen', {name: ''});
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
              if (!compareObjects(routineRef, routine)) {
                setModalVisible(!modalVisible);
              } else {
                navigation.navigate('RoutineListScreen', {name: ''});
              }
            }}>
            <Image source={assets.icn_goback} />
          </TouchableOpacity>
          <TouchableOpacity
            // className="flex-row flex-1 space-x-2 items-center justify-end mt-2 mr-2"
            onPress={() => {
              navigation.navigate('WorkoutScreen', {
                routineId: routine.id,
                workout: undefined,
              });
            }}>
            <Image source={assets.icn_plus} style={{}} />
            <Text
            // className="text-red-500 text-base"
            >
              {t('schedule.addNewWorkout')}
            </Text>
          </TouchableOpacity>
        </View>

        <CalenderRow routine={routine} />
      </View>
      <View style={style.workoutContainerStyle}>
        {workout?.title ? (
          <>
            <View
            // className="flex-row items-center space-x-5"
            >
              <Text style={style.workoutTitleStyle}>{workout.title}</Text>
              <TouchableOpacity
                onPress={() => {
                  // selectCurrentWorkout(workout.id);
                  navigation.navigate('WorkoutScreen', {
                    routineId: routine.id,
                    workout: workout,
                  });
                }}>
                <Image source={assets.icn_edit} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  // unselectCurrentDay(currentDay.id);
                  // unselectCurrentWorkout();
                }}>
                <Image source={assets.icn_remove} />
              </TouchableOpacity>
            </View>

            <PressableButton
              title={'Start'}
              iconSource={assets.icn_start}
              onPress={() => {
                navigation.navigate('SessionScreen', {
                  workout: workout,
                });
              }}
            />
          </>
        ) : (
          <Text
          // className="text-yellow-200"
          >
            {t('schedule.addNewWorkoutOrChoose')}
          </Text>
        )}
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <View style={style.preWorkoutListContainerStyle}>
          <Text
          // className="text-white"
          >
            {t('schedule.preListOfWorkouts')}
          </Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {routine.workouts?.map(workout => (
              <TouchableOpacity
                key={workout.id}
                onPress={() => {
                  // console.log(workout.id);
                  // console.log(currentDay.id);
                  // selectScheduledWorkout(workout.id);
                  // addWorkoutDay(currentDay.id);
                  setWorkoutId(workout.id);
                }}>
                <WorkoutCard routineId={routine.id} workout={workout} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

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
    flex: 1,
    flexWrap: 'wrap',
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

export default RoutineScreen;
