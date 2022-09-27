import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {store} from '../Store';

// Assets
import {colors} from '../components/constants';

// Components
import ExerciseActiveCard from '../components/ExerciseActiveCard';
import SetRestTimeCompo from '../components/SetRestTimeCompo';
import ExrRestTimeCompo from '../components/ExrRestTimeCompo';
import SessionController from '../components/SessionController';

// import { getExerciseName } from '../components/shared';

import {useNavigation} from '@react-navigation/native';

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

  const ExerciseActiveCardComponents = () => {
    const exers = workoutObject.exercises;
    const rows = [];
    let keyCounter = 0;
    for (let i = 0; i < exers.length; i++) {
      let exername = getExerciseName(exers[i].id);
      for (let j = 0; j < exers[i].freq.length; j++) {
        rows.push(
          <TouchableOpacity
            onPress={() => {
              if (exers[i].freq.length - j == 1) {
                setCompoAddress({i: i + 1, j: undefined});
              } else {
                setCompoAddress({i: i + 1, j: j + 1});
              }
              setVisible(true);
            }}
            key={keyCounter}>
            <ExerciseActiveCard
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
        {/* <Text className="text-red-600 mt-10">Total time: 1:29:44</Text> */}
        {/* <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <LinearGradient
            className="py-3 px-20 rounded-full mt-10"
            colors={['#E10D60', '#FA3B89']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.75, 1]}>
            <Text className="text-base font-semibold text-white">Quite</Text>
          </LinearGradient>
        </TouchableOpacity> */}
        {/* <TouchableOpacity
          onPress={() => {
            toggleStart();
          }}>
          <LinearGradient
            className="py-3 px-20 rounded-full mt-1"
            colors={['#E10D60', '#FA3B89']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0.75, 1]}>
            <Text className="text-base font-semibold text-white">
              Toogle Go {isStarted ? ' Enabled' : ' Disabled'} to address{' '}
              {compoAddress.i} - {compoAddress.j}
            </Text>
          </LinearGradient>
        </TouchableOpacity> */}
      </View>
      <ScrollView style={{marginBottom: 55}}>
        {/* apply for loop here same as exercise card parented by workoutScreen */}
        {ExerciseActiveCardComponents()}
      </ScrollView>
      <SessionController />
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
