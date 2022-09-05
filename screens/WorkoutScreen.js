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
import {useNavigation} from '@react-navigation/native';
import {store} from '../Store';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

// components
import AddNewWorkout from '../components/AddNew';
import ExerciseCard from '../components/ExerciseCard';
import AddExerciseModle from '../components/AddExerciseModle';

const WorkoutScreen = () => {
  const [workoutName, setWorkoutName] = useState(''); // workout name state
  const [modalVisible, setModalVisible] = useState(false); // workoutname alert modal state
  const [exercises, setExercises] = useState([]); // exercise list array state
  const [selectedExercisesNames, setSelectedExercisesNames] = useState([]);
  const [exerciseParam, setExerciseParam] = useState({});
  const [workoutId, setWorkoutId] = useState(-1);
  const [dayObject, setDayObject] = useState({});

  const navigation = useNavigation();

  const getDayObject = () => {
    var date = new Date();
    date.setDate(date.getDate() - 0); // add day
    const todayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name

    const dayObject = JSON.parse(store.getString(todayName));
    console.log(
      'Day Object retrieved successfully in workout screen',
      dayObject.day,
    );

    setDayObject(dayObject);
  };

  // Workflow functions
  const SaveWorkout = () => {
    if (workoutName.length > 0) {
      // Save the workout parameters and goBack to schedule

      alert('Workout ' + workoutName + ' saved successfully');

      navigation.goBack();
    } else {
      // Prompet the user to enter workout name
      setModalVisible(true);
    }
  };

  const handleSetExercises = exerciseArray => {
    setExercises(exerciseArray);
  };

  // if element unchecked remove it from the array
  function checkIfExerSelected(id, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === id) {
        return true;
      }
    }
    return false;
  }

  const handleSetExerciseParam = (exerId, reps) => {
    setExerciseParam(prev => {
      return {...prev};
    });
  };

  // I use this function in previous logic to select exercise and now is just for learn how to pass props throw navigatio.
  const selectExercise = exerId => {
    // FIXME: strange if you add curly bracts you will get error undefinded is not object.
    // setExercises(prev => {
    //   [...prev, exerId];
    // });
    // FIXME: strange this log doesn't print exercise state, but it does in useEffect.
    // console.log('select function call: ', exercises);
    // Solution is because this being called before render, so call this in return method will print.

    // check if the added exer already selelcted , if so then return
    if (checkIfExerSelected(exerId, exercises) === false) {
      setExercises(state => {
        return [...state, exerId];
      });
    }
  };

  useEffect(() => {
    console.log('array from workoutscreen: ', exercises);
    getDayObject();
  }, [exercises]);

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
          // options={{selectExercise: selectExercise()}}

          // Logic how to pass props throw navigation
          // convert the props to object and pass >> continue to next component
          // options={{selectExercise: selectExercise}}
          options={{handleSetExercises: handleSetExercises}}
        />
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <TextInput
          placeholder="Workout name"
          placeholderTextColor={colors.offwhite}
          onChangeText={setWorkoutName}
          style={{
            backgroundColor: colors.offwhite,
            paddingVertical: 12,
            paddingHorizontal: 20,
            color: colors.white,
            fontSize: 16,
            fontWeight: '400',
            borderRadius: 100,
            marginHorizontal: 30,
            marginTop: 47,
          }}
        />

        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">Pre-list of workouts</Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {dayObject.workout?.exercises?.map(element => {
              return <ExerciseCard key={element.id} exerName={element.title} />;
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
            <TouchableOpacity
              onPress={() => {
                alert('Hello');
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
