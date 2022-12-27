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

// Assets
import {colors, assets} from '../components/constants';

// components
import ExerciseCard from '../components/ExerciseCard';
import RestTimeController from '../components/RestTimeController';

// Store
import useStore from '../store/useStore';

const WorkoutScreen = () => {
  // FIXME: Re-design Rest time controllers
  const currentWorkout = useStore(s => s.currentWorkout);
  const saveWorkout = useStore(s => s.saveWorkout);
  const deleteWorkout = useStore(s => s.deleteWorkout);
  const addWorkoutTitle = useStore(s => s.addWorkoutTitle);

  const [modalVisible, setModalVisible] = useState(false); // workoutname alert modal state
  const [workoutName, setWorkoutName] = useState(currentWorkout?.title); // workout name state

  const navigation = useNavigation();

  /* HOW TO ADD FREQUANCY TO AN EXERCISE */
  const addFreq = freq => {
    let exercises = currentWorkout.exercises;
    exercises.freq = freq;
  };

  const savewo = () => {
    addWorkoutTitle(workoutName);
    if (workoutName.length === 0) {
      setModalVisible(true);
    } else {
      saveWorkout();
      navigation.goBack();
    }
  };

  const RestTimeDrawer = () => {
    let exercises = currentWorkout?.exercises?.length;
    if (exercises === 1) {
      return <RestTimeController id={0} indicatorTitle="Set rest time" />;
    } else if (exercises > 1) {
      return (
        <>
          <RestTimeController id={0} indicatorTitle="Set rest time" />
          <RestTimeController id={1} indicatorTitle="Exercise rest time" />
        </>
      );
    } else {
      return <></>;
    }
  };

  useEffect(() => {
    RestTimeDrawer();
  }, []);

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
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={style.textStyle}>Okey</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={style.goBackStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={assets.icn_goback} />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row flex-1 space-x-2 items-center justify-end mt-2 mr-2"
          onPress={() => {
            navigation.navigate('ExerciseScreen', {
              exercises: currentWorkout?.exercises,
            });
          }}>
          <Image source={assets.icn_plus} style={{}} />
          <Text className="text-red-500 text-base">Add new exercise</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <TextInput
          placeholder="Workout name"
          placeholderTextColor={colors.offwhite}
          onChangeText={inpuText => setWorkoutName(inpuText)}
          defaultValue={currentWorkout?.title}
          style={style.textInputStyle}
        />

        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">Pre-list of workouts</Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {currentWorkout.exercises?.map(element => {
              return (
                <ExerciseCard
                  key={element.id}
                  exercise={element}
                  addFreq={addFreq}
                />
              );
            })}
            {RestTimeDrawer()}
            <TouchableOpacity
              onPress={() => {
                savewo();
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
                console.log(currentWorkout);
                deleteWorkout(currentWorkout.id);
                navigation.goBack();
              }}>
              <LinearGradient
                style={style.touchableOpacityStartStyle}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#FA3B89', '#E10D60']}>
                <View className="flex-row justify-center items-center space-x-2">
                  <Image source={assets.icn_start} />
                  <Text className="text-base font-semibold text-white">
                    Check (del)
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
