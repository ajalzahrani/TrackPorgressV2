import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {store} from '../Store';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

// components
import AddNewWorkout from '../components/AddNew';
import Divider from '../components/Divider';
import ExerciseSelectRow from '../components/ExerciseSelectRow';

const ExerciseScreen = () => {
  const [exData, setEXData] = useState(exerciseData);
  const [isSelected, setIsSelected] = useState(false);

  const setSelected = id => {
    const key = id + '';
    if (store.getBoolean(key) === false) {
      store.set(key, true);
    } else if (store.getBoolean(key) === true) {
      store.set(key, false);
    } else {
      store.set(key, true);
    }
  };

  const checkSelected = id => {
    const key = id + '';
    const value = store.getBoolean(key);
    if (value == null) {
      return false;
    }
    console.log(value);
    return value;
  };

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View style={{paddingHorizontal: 16}}>
        {/* TextInput component */}
        <TextInput
          placeholder="Exercise name"
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

        {/* Exercise List */}
        <View style={style.preWorkoutListContainerStyle}>
          <FlatList
            data={exData}
            renderItem={({item}) => <ExerciseSelectRow item={item} />}
            keyExtractor={item => item.id}
          />
        </View>

        {/* OK Button */}
        <TouchableOpacity>
          <LinearGradient
            style={style.touchableOpacityStartStyle}
            start={{x: 1, y: 0}}
            end={{x: 0, y: 0}}
            colors={['#FA3B89', '#E10D60']}>
            <View className="flex-row justify-center items-center space-x-2">
              <Image source={assets.icn_start} />
              <Text className="text-base font-semibold text-white">Done</Text>
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  ExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  preWorkoutListContainerStyle: {
    marginTop: 24,
    backgroundColor: colors.secondaryow,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
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
    marginHorizontal: 80,
  },
  exerciseTitleStyle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },
});

export default ExerciseScreen;
