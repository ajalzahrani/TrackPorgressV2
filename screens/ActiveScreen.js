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
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {store} from '../Store';

// Assets
import {colors, assets} from '../components/constants';

// Components
import ExerciseActiveCard from '../components/ExerciseActiveCard';

import {useNavigation} from '@react-navigation/native';

const ActiveScreen = ({route}) => {
  const [exData, setEXData] = useState([]); // state holding exercise data.
  const navigation = useNavigation();

  const {workoutObject} = route.params;

  const setupObjects = () => {
    const exerciseData = JSON.parse(store.getString('exercises')); // Use memo hook for better performance
    setEXData(exerciseData);
  };

  useEffect(() => {
    setupObjects();
    console.log('done setupObjects');
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
      <View style={style.workoutContainerStyle}>
        <View className="flex-row items-center space-x-5">
          <Text style={style.workoutTitleStyle}>{workoutObject.title}</Text>
        </View>
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
      </View>
      <ScrollView>
        <View>
          {workoutObject.exercises.map(exercise => {
            return exercise.freq.map(set => {
              return <ExerciseActiveCard exercise={exercise} exData={exData} />;
            });
          })}
        </View>
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
    marginTop: 56,
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
});
