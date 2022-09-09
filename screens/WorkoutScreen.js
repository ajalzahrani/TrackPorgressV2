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
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import {store} from '../Store';
import uuid from 'react-native-uuid';

// Assets
import {colors, assets} from '../components/constants';

// components
import AddNewWorkout from '../components/AddNew';
import ExerciseCard from '../components/ExerciseCard';
import {getDayObject} from '../components/shared';

const WorkoutScreen = () => {
  // FIXME: presis workout name if entered before assigning new exercises.
  // FIXME: accept workout name if not edited.
  // FIXME: dont' save workout when go back.
  const [workoutName, setWorkoutName] = useState(''); // workout name state
  const [modalVisible, setModalVisible] = useState(false); // workoutname alert modal state
  const [exData, setEXData] = useState([]); // state holding exercise data.
  const [dayObject, setDayObject] = useState({});

  const navigation = useNavigation();
  const isFoucsed = useIsFocused();

  /* UPDATE CURRENT DAY OBJECT PARAMETERS (MAIN METHOD) */
  const handleScheduleUpdate = ScheduleObj => {
    // console.log("nothing to save");
    setDayObject(prev => {
      return {...prev, ScheduleObj};
    });
    console.log('dayObject after update workout: ', dayObject);

    // do store save.
  };

  /* ADD NEW WORKOUT */
  const handleAddNewWorkout = title => {
    const workoutObj = {
      workout: {
        id: uuid.v4(),
        title: title,
        exercises: [],
      },
    };
    let updatedDayObj = Object.assign(dayObject, workoutObj);
    console.log(updatedDayObj);
    handleScheduleUpdate(updatedDayObj);
  };

  // Workflow functions
  const SaveWorkout = () => {
    if (workoutName.length > 0) {
      // Save the workout parameters and goBack to schedule

      if ('workout' in dayObject) {
        dayObject.workout.title = workoutName;
      } else {
        handleAddNewWorkout(workoutName);
      }

      store.set(dayObject.day, JSON.stringify(dayObject));

      alert('Workout ' + workoutName + ' saved successfully');

      navigation.goBack();
    } else {
      // Prompet the user to enter workout name
      setModalVisible(true);
    }
  };

  /* HOW TO ADD FREQUANCY TO AN EXERCISE */
  const addFreq = freq => {
    let exercises = dayObject.workout.exercises;
    exercises.freq = freq;
    // handleSetToday(exercise);
    console.log(dayObject.workout.exercises);
  };

  useEffect(() => {
    const exerciseData = JSON.parse(store.getString('exercises'));
    setEXData(exerciseData);

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
        />
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <TextInput
          placeholder="Workout name"
          placeholderTextColor={colors.offwhite}
          onChangeText={setWorkoutName}
          defaultValue={dayObject.workout?.title}
          style={style.textInputStyle}
        />

        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">Pre-list of workouts</Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {dayObject.workout?.exercises?.map(element => {
              return (
                <ExerciseCard
                  key={element.id}
                  exercise={element}
                  exData={exData}
                  addFreq={addFreq}
                />
              );
            })}
            <TouchableOpacity
              onPress={() => {
                SaveWorkout();
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
                console.log(dayObject.workout.exercises);
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
