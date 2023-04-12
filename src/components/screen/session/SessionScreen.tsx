import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  VirtualizedList,
  ListRenderItem,
  ListRenderItemInfo,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {store} from '../../../Store';

// Assets
import {colors} from 'src/assets';

// Components
import SessionExerciseCard from './components/SessionExerciseCard';
import SessionController from './components/SessionController';
import Divider from 'src/components/shared/Divider';

// Store
import useExerciseStore from 'src/store/useExerciseMaster';
import useRoutineStore from 'src/store/useRoutineStore';

// Navigation
import {RouteProp} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import type {exerciseMasterType} from 'src/components/shared/globalTypes';
import useSessionStore from 'src/store/useSessionStore';

type SessionScreenRouteProp = RouteProp<
  RoutineStackRootParamList,
  'SessionScreen'
>;
type SessionScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'SessionScreen'
>;

import type {exercisesType} from 'src/components/shared/globalTypes';

type SessionScreenProp = {
  route: SessionScreenRouteProp;
  navigation: SessionScreenNavigationProp;
};

const SessionScreen: React.FC<SessionScreenProp> = ({route, navigation}) => {
  // FIXME: ExerciseActiveCard render twice ???? need to fix this
  // FIXME: workout name should'nt take all the space in pre-list of workout
  // FIXME: Adjust the design
  // FIXME: Open next card
  // FIXME: Show set order number
  // FIXME: Fix Scrolling tips
  // FIXME: Scroll to next active card not skitch card
  // FIXME: Fix last cards on screen when opened

  const workout = route.params.workout;
  const exerciseMaster = useExerciseStore(s => s.exerciseMaster);
  const [exData, setEXData] = useState([]); // state holding exercise data.
  const [selectedId, setSelectedId] = useState(null);
  const [ref, setRef] = useState<FlatList<any> | null>(null); // ref to flatlist
  const registerSession = useSessionStore(s => s.registerSession);

  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = (exerciseId: string) => {
    let exercise = exerciseMaster.filter(exercise => {
      return exercise.id === exerciseId;
    });
    return exercise[0]?.name;
  };

  const scrollToNextCard = (index: number) => {
    index++;
    index *= 100;
    // console.log('current index: ', index);
    if (ref) {
      ref.scrollToOffset({animated: true, offset: index + 2});
    }
  };

  let scrollKey = 0;
  const renderExercise: ListRenderItem<exercisesType> = ({
    item,
  }: ListRenderItemInfo<exercisesType>) => {
    let exername = getExerciseName(item.id);
    const rows = [];
    let key = 0;
    for (let j = 0; j < item.freq.length; j++) {
      // SET END CHECKER
      if (item.freq.length - j == 1) {
        rows.push(
          <SessionExerciseCard
            key={key}
            index={scrollKey}
            exerciseId={item.id}
            exerciseName={exername}
            reps={item.freq[j]}
            resttimeId={1}
            resttime={workout.resettime}
            scrollToNextCard={scrollToNextCard}
          />,
        );
      } else {
        rows.push(
          <SessionExerciseCard
            key={key}
            index={scrollKey}
            exerciseId={item.id}
            exerciseName={exername}
            reps={item.freq[j]}
            resttimeId={0}
            resttime={workout.resettime}
            scrollToNextCard={scrollToNextCard}
          />,
        );
      }
      key++;
      scrollKey++;
    }

    return <>{rows}</>;
  };

  useEffect(() => {
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
    <SafeAreaView style={style.safeViewStyle}>
      {/* <Modal_View /> */}
      <View style={style.workoutContainerStyle}>
        <View
        // className="flex-row items-center space-x-5"
        >
          <Text style={style.workoutTitleStyle}>{workout.title}</Text>
          <TouchableOpacity
            onPress={() => {
              // console.log(JSON.stringify(printVol()));
            }}>
            <Text>Show vol</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        contentContainerStyle={{paddingBottom: 72}}
        data={workout.exercises}
        ref={ref => setRef(ref)}
        renderItem={renderExercise}
        keyExtractor={item => item.id}
        extraData={selectedId}
      />
      <SessionController workoutId={workout.id} />
    </SafeAreaView>
  );
};

export default SessionScreen;

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
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
