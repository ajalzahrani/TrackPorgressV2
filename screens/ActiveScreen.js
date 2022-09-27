import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  Modal,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {store} from '../Store';

// Assets
import {colors, assets} from '../components/constants';

// Components
import ExerciseActiveCard from '../components/ExerciseActiveCard';
import SetRestTimeCompo from '../components/SetRestTimeCompo';
import ExrRestTimeCompo from '../components/ExrRestTimeCompo';

// import { getExerciseName } from '../components/shared';

import {useNavigation} from '@react-navigation/native';

// const ExrRestTimeCompo = ({id}) => {
//   return (
//     <View className="p-5 mx-5 bg-red-500 items-center justify-center">
//       <Text className="text-gray-900">ID: {id} Exercise Rest Time</Text>
//     </View>
//   );
// };

const ActiveScreen = ({route}) => {
  // FIXME: ExerciseActiveCard render twice ???? need to fix this
  const [exData, setEXData] = useState([]); // state holding exercise data.
  const [visible, setVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [compoAddress, setCompoAddress] = useState({});
  const navigation = useNavigation();

  const {workoutObject} = route.params;

  const setupObjects = () => {
    const exerciseData = JSON.parse(store.getString('exercises')); // Use memo hook for better performance
    setEXData(exerciseData);
  };

  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = id => {
    let exername = exData.filter(element => {
      return element.id === id;
    });
    return exername[0]?.title;
  };

  const Modal_View0 = () => (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <View style={style.MainContainer}>
        <View style={style.modalView}>
          {/* <Text style={style.text}>Example of Modal in React native </Text> */}
          <TextInput
            className="border-2 border-white h-10 w-1/2 text-black px-5"
            keyboardType="numeric"
          />
          <Button title="Register" onPress={() => setVisible(!visible)} />
        </View>
      </View>
    </Modal>
  );

  const Modal_View1 = () => (
    <Modal
      transparent={true}
      animationType={'slide'}
      visible={visible}
      onRequestClose={() => setVisible(!visible)}>
      <View style={style.cardContainer}>
        {/* Exercise Titile */}
        <View
          className="space-x-6"
          style={{
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={() => setVisible(!visible)}>
            <Image source={assets.icn_remove} />
          </TouchableOpacity>
          <Text style={style.exerciseTitleStyle}>
            {/* {getExerciseName(exercise.id)} */}
            Wide grip pushup SET 1
          </Text>
        </View>

        {/* <SETsController indicatorTitle={'Set'} /> */}
        <View style={style.containerStyle}>
          {/* inner set container */}
          <View style={style.innerContainerStyle}>
            {/* Number indicator */}
            <View style={style.numberIndicator}>
              <Text style={{color: colors.white}}>120 kg</Text>
            </View>

            <Text style={style.middleTextStyle}>Weight</Text>

            {/* plus - min buttons */}
            <View style={{flexDirection: 'row'}} className="space-x-10">
              <TouchableOpacity>
                <Image source={assets.icn_min} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={assets.icn_add} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Dividor */}
        <View
          style={{
            borderWidth: 1,
            width: 300,
            borderColor: colors.secondaryow,
          }}
        />
        {/* <SETsController indicatorTitle={'Set'} /> */}
        <View style={style.containerStyle}>
          {/* inner set container */}
          <View style={style.innerContainerStyle}>
            {/* Number indicator */}
            <View style={style.numberIndicator}>
              <Text style={{color: colors.white}}>6 r</Text>
            </View>

            <Text style={style.middleTextStyle}>Reps</Text>

            {/* plus - min buttons */}
            <View style={{flexDirection: 'row'}} className="space-x-10">
              <TouchableOpacity>
                <Image source={assets.icn_min} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={assets.icn_add} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Dividor */}
        <View
          style={{
            borderWidth: 1,
            width: 300,
            borderColor: colors.secondaryow,
          }}
        />
        {/* <SETsController indicatorTitle={'Set'} /> */}
        <View style={style.containerStyle}>
          {/* inner set container */}
          <View style={style.innerContainerStyle}>
            {/* Number indicator */}
            <View style={style.numberIndicator}>
              <Text style={{color: colors.white}}>90 s</Text>
            </View>

            <Text style={style.middleTextStyle}>TUT</Text>

            {/* plus - min buttons */}
            <View style={{flexDirection: 'row'}} className="space-x-10">
              <TouchableOpacity>
                <Image source={assets.icn_min} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={assets.icn_add} />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <TouchableOpacity
          className="mb-3"
          onPress={() => {
            // Register user entry data
            setVisible(false);
          }}>
          <LinearGradient
            className="py-3 px-10 rounded-full mt-10"
            colors={['#E10D60', '#FA3B89']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.75, 1]}
            // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
          >
            <Text className="text-base font-semibold text-white">Register</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </Modal>
  );

  const ExerciseActiveCardComponents = () => {
    const exers = workoutObject.exercises;
    // console.log('Exercises length: ', exers.length);
    // console.log('Freq lenth: ', exers[0].freq.length);

    const rows = [];
    let keyCounter = 0;
    for (let i = 0; i < exers.length; i++) {
      let exername = getExerciseName(exers[i].id);
      for (let j = 0; j < exers[i].freq.length; j++) {
        rows.push(
          <TouchableOpacity
            onPress={() => {
              // setVisible(!visible);
              // console.log('Exercise: ', i + 1, ' SET: ', j + 1);

              if (exers[i].freq.length - j == 1) {
                setCompoAddress({i: i + 1, j: undefined});
              } else {
                setCompoAddress({i: i + 1, j: j + 1});
              }
              setVisible(true);
              // setIsStarted(true);
            }}
            key={keyCounter}>
            <ExerciseActiveCard
              // key={keyCounter}
              id={keyCounter}
              exername={exername}
              reps={exers[i].freq[j]}
            />
          </TouchableOpacity>,
        );
        keyCounter++;

        if (exers[i].freq.length - j > 1) {
          rows.push(
            <SetRestTimeCompo
              key={keyCounter}
              id={keyCounter}
              isStarted={isStarted}
              setIsStarted={setIsStarted}
              compoAddress={compoAddress}
              i={i + 1}
              j={j + 1}
            />,
          );
          keyCounter++;
        }
      }
      if (exers.length - i > 1) {
        rows.push(
          <ExrRestTimeCompo
            key={keyCounter}
            id={keyCounter}
            i={i + 1}
            compoAddress={compoAddress}
            isStarted={isStarted}
            setIsStarted={setIsStarted}
          />,
        );
      }
      keyCounter++;
    }
    // console.log('rows count: ', rows.length);
    // console.log('keyCounter : ', keyCounter);
    return <>{rows}</>;
  };

  const toggleStart = () => {
    setIsStarted(!isStarted);
  };

  useEffect(() => {
    ExerciseActiveCardComponents();
  }, [isStarted]);

  useEffect(() => {
    setupObjects();
    navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: colors.semiPrimary,
        },
      });
  }, [navigation]);
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      {/* <Modal_View /> */}
      <View style={style.workoutContainerStyle}>
        <View className="flex-row items-center space-x-5">
          <Text style={style.workoutTitleStyle}>{workoutObject.title}</Text>
        </View>
        <Text className="text-red-600 mt-10">Total time: 1:29:44</Text>
        <TouchableOpacity
          onPress={() => {
            // console.log(exData);
            navigation.goBack();
          }}>
          <LinearGradient
            className="py-3 px-20 rounded-full mt-10"
            colors={['#E10D60', '#FA3B89']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.75, 1]}
            // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
          >
            <Text className="text-base font-semibold text-white">Quite</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            toggleStart();
            // console.log('toogle go', isStarted);
          }}>
          <LinearGradient
            className="py-3 px-20 rounded-full mt-1"
            colors={['#E10D60', '#FA3B89']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.75, 1]}
            // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
          >
            <Text className="text-base font-semibold text-white">
              Toogle Go {isStarted ? ' Enabled' : ' Disabled'} to address{' '}
              {compoAddress.i} - {compoAddress.j}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {/* apply for loop here same as exercise card parented by workoutScreen */}
        {ExerciseActiveCardComponents()}
        {/* {workoutObject.exercises.map(exercise => {
            return exercise.freq.map((set, index) => {
              return (
                <View>
                  <TouchableOpacity>
                    <ExerciseActiveCard
                      key={index}
                      exercise={exercise}
                      exData={exData}
                    />
                  </TouchableOpacity>
                  <View className="p-5 mx-5 bg-slate-500 items-center justify-center">
                    <Text className="text-gray-900">Time between sets</Text>
                  </View>
                </View>
              );
            });
          })} */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ActiveScreen;

const style = StyleSheet.create({
  workoutContainerStyle: {
    display: 'flex',
    flexdirection: 'column',
    alignItems: 'center',
    padding: 0,
    gap: 30,
    marginTop: 10,
    marginBottom: 10,
  },
  workoutTitleStyle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 30,
    lineHeight: 45,
    textAlign: 'center',
    color: colors.white,
  },

  // Exercise card
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    backgroundColor: colors.secondaryow,
    borderRadius: 10,
  },
  workoutTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    color: colors.white,
  },
  editContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchableOpacityArrowStyle: {
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },

  // modal style
  MainContainer: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalView: {
    width: 300,
    height: 240,
    backgroundColor: colors.greeny,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'white',
  },

  text: {
    fontSize: 28,
    textAlign: 'center',
    color: 'white',
    padding: 10,
  },
  cardContainer: {
    // display: 'flex',
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    marginHorizontal: 20,
    backgroundColor: colors.semiPrimary,
    borderRadius: 20,
  },
  exerciseTitleStyle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    // lineHeight: 30,
    marginTop: 10,
  },
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  numberIndicator: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.secondaryow,
    width: 80,
    height: 29,
  },
  middleTextStyle: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 24.5,
  },
});
