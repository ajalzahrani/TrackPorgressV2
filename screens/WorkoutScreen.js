import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

// components
import AddNewWorkout from '../components/AddNew';
import ExerciseCard from '../components/ExerciseCard';

const ExerciseScreen = () => {
  const [ed, setEd] = useState(exerciseData);

  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View style={style.goBackStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={assets.icn_goback} />
        </TouchableOpacity>
        <AddNewWorkout title={'Add new exercise'} />
      </View>
      <View style={{paddingHorizontal: 16}}>
        <View>
          <TextInput
            placeholder="Workout name"
            placeholderTextColor={colors.white}
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
        </View>
        <View style={{}}>
          <View style={style.preWorkoutListContainerStyle}>
            <Text className="text-white">Pre-list of workouts</Text>
            <ScrollView
              contentContainerStyle={{paddingBottom: 72}}
              style={{alignSelf: 'stretch'}}>
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <ExerciseCard />
              <TouchableOpacity>
                <LinearGradient
                  style={style.touchableOpacityStartStyle}
                  start={{x: 1, y: 0}}
                  end={{x: 0, y: 0}}
                  colors={['#FA3B89', '#E10D60']}>
                  <View className="flex-row justify-center items-center space-x-2">
                    <Image source={assets.icn_start} />
                    <Text className="text-base font-semibold text-white">
                      Start
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </View>
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
});

export default ExerciseScreen;
