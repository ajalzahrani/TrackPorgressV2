import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
  Pressable,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import {useTranslation} from 'react-i18next';
import uuidv4 from 'src/components/shared/uuid4v';

// Assets
import {colors, assets} from 'src/assets';

// components
import ExerciseCard from './components/ExerciseCard';
import RestTimeController from './components/RestTimeController';
import {PressableButton} from 'src/components/shared';
import {ScreenContainer} from 'src/components/shared';

// Store
import useRoutineStore from 'src/store/useRoutineStore';

// Navigation
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {workoutType} from 'src/components/shared/globalTypes';
type WorkoutScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'WorkoutScreen'
>;

type WorkoutScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'WorkoutScreen'
>;

type WorkoutScreenProp = {
  route?: WorkoutScreenRouteProp;
  navigation: WorkoutScreenNavigationProp;
};

const WorkoutScreen: React.FC<WorkoutScreenProp> = ({route, navigation}) => {
  // FIXME: Re-design Rest time controllers

  const routines = useRoutineStore(s => s.routines);
  const routineId = useRoutineStore(s => s.stateId.routineId);
  const workoutId = useRoutineStore(s => s.stateId.workoutId);

  const routineIndex = routines.findIndex(r => r.id === routineId);
  const routine = routines[routineIndex];
  const workoutIndex = routine.workouts.findIndex(w => w.id === workoutId);
  const workout = routine.workouts[workoutIndex];
  const deleteWorkout = useRoutineStore(s => s.deleteWorkout);
  const addWorkout = useRoutineStore(s => s.addWorkout);
  const addFreq = useRoutineStore(s => s.addFreq);
  const [modalVisible, setModalVisible] = useState(false);
  const {t} = useTranslation();

  const handleAddWorkout = () => {
    if (workout?.title.length === 0) {
      setModalVisible(true);
    } else {
      if (workout !== undefined) {
        addWorkout(routineId, workout.id, workout);
      }
      navigation!.goBack();
    }
  };

  const handleAddWorkoutTitle = (title: string) => {
    workout!.title = title;
  };

  const handleUpdateExercise = (exerciseId: string) => {
    if (workout !== undefined) {
    }
  };

  const RestTimeDrawer = () => {
    if (workout !== undefined) {
      let exercises = workout?.exercises?.length;
      if (exercises === 1) {
        return (
          <RestTimeController
            controllerType={0}
            indicatorTitle="Set rest time"
            resttime={workout.resttime}
          />
        );
      } else if (exercises > 1) {
        return (
          <>
            <RestTimeController
              controllerType={0}
              indicatorTitle="Set rest time"
              resttime={workout.resttime}
            />
            <RestTimeController
              controllerType={1}
              indicatorTitle="Exercise rest time"
              resttime={workout.resttime}
            />
          </>
        );
      } else {
        return <></>;
      }
    }
  };

  useEffect(() => {
    RestTimeDrawer();
  }, []);

  return (
    <ScreenContainer>
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
            <Text style={style.modalText}>Type in workout name</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={style.textStyle}>Okey</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={style.goBackStyle}>
        <TouchableOpacity onPress={() => navigation!.goBack()}>
          <Image source={assets.icn_goback} />
        </TouchableOpacity>
        <TouchableOpacity
          style={style.addNewExercise}
          onPress={() => {
            navigation.navigate('ExerciseScreen');
          }}>
          <Image source={assets.icn_plus} style={{}} />
          <Text style={{color: colors.red}}>{t('workout.addNewExercise')}</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <View style={style.preWorkoutListContainerStyle}>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            <TextInput
              placeholder="Workout name"
              placeholderTextColor={colors.offwhite}
              onChangeText={inpuText => handleAddWorkoutTitle(inpuText)}
              defaultValue={workout?.title}
              style={style.textInputStyle}
            />

            {workout?.exercises?.map(exercise => {
              return (
                <ExerciseCard
                  key={exercise.id}
                  routineId={routineId}
                  workoutId={workout.id}
                  exercise={exercise}
                />
              );
            })}
            {RestTimeDrawer()}

            <PressableButton
              title={t('workout.skitch')}
              iconSource={assets.icn_edit}
              onPress={() => {
                handleAddWorkout();
              }}
            />
            {/* Test button */}
            <PressableButton
              title={t('workout.delete')}
              onPress={() => {
                if (workout !== undefined) {
                  if (workout.id !== undefined) {
                    deleteWorkout(routineId, workout.id);
                  }
                }
                navigation!.goBack();
              }}
            />
          </ScrollView>
        </View>
      </View>
    </ScreenContainer>
  );
};

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  touchableOpacityArrowStyle: {
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },
  goBackStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  preWorkoutListContainerStyle: {
    // marginTop: 24,
    marginBottom: 24,
    flex: 1,
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
  textInputStyle: {
    backgroundColor: colors.offwhite,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 100,
    marginHorizontal: 30,
    marginTop: 47,
  },

  // modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
  },
  modalView: {
    margin: 20,
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
    marginBottom: 15,
    textAlign: 'center',
  },
  addNewExercise: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default WorkoutScreen;
