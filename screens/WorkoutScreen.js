import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState, useRef} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {store} from '../Store';
import uuid from 'react-native-uuid';

// Assets
import {colors, assets} from '../components/constants';

// components
import AddNewWorkout from '../components/AddNew';
import ExerciseCard from '../components/ExerciseCard';
import {getDayObject} from '../components/shared';
import {getWorkoutObject} from '../components/shared';

const WorkoutScreen = ({route}) => {
  // FIXME: presis workout name if entered before assigning new exercises.
  // FIXME: dont' save workout when go back.
  // FIXME: prompet user to enter workout name if empty
  const [modalVisible, setModalVisible] = useState(false); // workoutname alert modal state
  const [exData, setEXData] = useState([]); // state holding exercise data.
  const [dayObject, setDayObject] = useState({});
  const [workoutName, setWorkoutName] = useState(dayObject?.workout?.title); // workout name state
  const [workoutObject, setWorkoutObject] = useState({});

  const navigation = useNavigation();
  const isFoucsed = useIsFocused();

  const {workoutId} = route.params;

  const setupObjects = () => {
    const exerciseData = JSON.parse(store.getString('exercises')); // Use memo hook for better performance
    setEXData(exerciseData);

    if (workoutId !== undefined) {
      let workoutObject = getWorkoutObject(workoutId);
      setWorkoutObject(workoutObject);
      setWorkoutName(workoutObject?.title);
    }
  };

  const saveWokrout = () => {
    if (workoutName === undefined) {
      setModalVisible(true);
      return;
    }

    // update workout name.
    setWorkoutObject(prev => {
      return {...prev, title: workoutName};
    });

    // Fetch workouts from stroe
    let workouts = JSON.parse(store.getString('workouts'));

    if (workoutId !== undefined) {
      // Workout update
      // Assign saved workout to workoutObject
      for (let i = 0; i < workouts.length; i++) {
        if (workouts[i].id === workoutId) {
          workouts[i] = workoutObject;
        }
      }
    } else {
      // New workout
      // Push with new workout object to workouts array
      workouts.push(workoutObject);
    }

    // Commit the store
    store.set('workouts', JSON.stringify(workouts));
    navigation.goBack();
  };

  /* ADD NEW WORKOUT */
  const handleWorkoutParams = (exercises = []) => {
    if (workoutId === undefined) {
      const newWorkoutObj = {
        id: uuid.v4(),
        title: workoutName,
        exercises: exercises,
      };
      setWorkoutObject(newWorkoutObj);
    } else {
      setWorkoutObject(prev => {
        return {...prev, exercises: exercises};
      });
    }
  };

  /* HOW TO ADD FREQUANCY TO AN EXERCISE */
  const addFreq = freq => {
    let exercises = workoutObject.exercises;
    exercises.freq = freq;
  };

  const hadndleDeleteExercise = index => {
    let exercises = workoutObject?.exercises;
    let indexOf = undefined;
    for (let i = 0; i < exercises.length; i++) {
      if (exercises[i].id === index) {
        indexOf = i;
      }
    }
    exercises.splice(indexOf, 1);
    console.log('Exercies here after delete one exercies: ', exercises);
    setWorkoutObject(prev => {
      return {...prev, exercises: exercises};
    });
  };

  useEffect(() => {
    setupObjects();
    setDayObject(getDayObject());
  }, [isFoucsed]);

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
            <Text style={style.modalText}>Type in workout name</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={style.textStyle}>Okey</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={style.goBackStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={assets.icn_goback} />
        </TouchableOpacity>
        <AddNewWorkout
          title={'Add new exercise'}
          navigateTo={{to: 'ExerciseScreen'}}
          options={{
            handleWorkoutParams: handleWorkoutParams,
            exercises: workoutObject?.exercises,
          }}
        />
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <TextInput
          placeholder="Workout name"
          placeholderTextColor={colors.offwhite}
          onChangeText={setWorkoutName}
          defaultValue={workoutObject?.title}
          style={style.textInputStyle}
        />

        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">Pre-list of workouts</Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {workoutObject.exercises?.map(element => {
              return (
                <ExerciseCard
                  key={element.id}
                  exercise={element}
                  exData={exData}
                  addFreq={addFreq}
                  hadndleDeleteExercise={hadndleDeleteExercise}
                />
              );
            })}
            <TouchableOpacity
              onPress={() => {
                //SaveWorkout();
                saveWokrout();
              }}>
              <LinearGradient
                style={style.touchableOpacityStartStyle}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#FA3B89', '#E10D60']}>
                <View className="flex-row justify-center items-center space-x-2">
                  <Image source={assets.icn_start} />
                  <Text className="text-base font-semibold text-white">
                    Sketch
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            {/* Test button */}
            <TouchableOpacity
              onPress={() => {
                // alert('Hello');
                // handleAddNewWorkout();
                console.log(workoutObject);
                // console.log(workoutId);
              }}>
              <LinearGradient
                style={style.touchableOpacityStartStyle}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#FA3B89', '#E10D60']}>
                <View className="flex-row justify-center items-center space-x-2">
                  <Image source={assets.icn_start} />
                  <Text className="text-base font-semibold text-white">
                    Check
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
    marginTop: 24,
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
});

export default WorkoutScreen;
