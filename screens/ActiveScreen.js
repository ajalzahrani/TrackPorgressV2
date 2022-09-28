import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {store} from '../Store';

// Assets
import {colors} from '../components/constants';

// Components
import ExerciseActiveCard from '../components/ExerciseActiveCard';
import SessionController from '../components/SessionController';
import Divider from '../components/Divider';

// import { getExerciseName } from '../components/shared';

import {useNavigation} from '@react-navigation/native';

const ActiveScreen = ({route}) => {
  // FIXME: ExerciseActiveCard render twice ???? need to fix this
  // FIXME: workout name should'nt take all the space in pre-list of workout
  const [exData, setEXData] = useState([]); // state holding exercise data.
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
        // SET END CHECKER
        if (exers[i].freq.length - j == 1) {
          rows.push(
            <ExerciseActiveCard
              key={keyCounter}
              id={keyCounter}
              exername={exername}
              reps={exers[i].freq[j]}
              resttimeId={1}
              resttime={workoutObject.resttime}
            />,
          );
          keyCounter++;
        } else {
          rows.push(
            <ExerciseActiveCard
              key={keyCounter}
              id={keyCounter}
              exername={exername}
              reps={exers[i].freq[j]}
              resttimeId={0}
              resttime={workoutObject.resttime}
            />,
          );
          keyCounter++;
        }
      }
      // EXERCISE END CHECKER
      if (exers.length - i > 1) {
        rows.push(
          <View
            key={keyCounter}
            style={{
              borderWidth: 1,
              // width: 300,
              borderColor: colors.secondaryow,
            }}
          />,
        );
      }
      keyCounter++;
    }
    return <>{rows}</>;
  };

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
