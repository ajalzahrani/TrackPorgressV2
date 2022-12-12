import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {store} from '../Store';
import uuid from 'react-native-uuid';

// Assets
import {colors, assets} from '../components/constants';

// components
import ExerciseSelectRow from '../components/ExerciseSelectRow';
import {useNavigation} from '@react-navigation/native';
import {getDayObject} from '../components/shared';

// Store
import useStore from '../store/useStore';

const ExerciseScreen = ({route}) => {
  // FIXME: presis exercise selection when search
  const exercisesMaster = useStore(s => s.exercisesMaster);
  const saveNewExerciseMaster = useStore(s => s.saveNewExerciseMaster);
  const [search, setSearch] = useState(''); //
  const [searchResult, setSearchResult] = useState(exercisesMaster);
  const [notFound, setNotFound] = useState(false); // handle if no exercise found in search

  const navigation = useNavigation();

  const {exercises} = route.params;

  // search the list of exercises data and eanble the user to add not found exercies.
  const handleSearch = searchText => {
    setSearch(searchText);
    const filterdExercies = exercisesMaster.filter((exer, index) => {
      // console.log(exer.title.match(searchText));
      return exer.title.match(searchText);
    });
    if (searchText.length === 0) {
      setSearchResult(exercisesMaster);
      setNotFound(false);
    } else if (filterdExercies.length === 0) {
      setNotFound(true);
    } else {
      setSearchResult(filterdExercies);
      setNotFound(false);
    }
  };

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View style={{paddingHorizontal: 16, flex: 1}}>
        {/* TextInput component */}
        <TextInput
          placeholder="Exercise name"
          placeholderTextColor={colors.offwhite}
          onChangeText={handleSearch}
          value={search}
          style={style.textInputStyle}
        />

        {/* FIXME: use notFound ?? () pattern */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            opacity: notFound ? 1 : 0,
          }}>
          <Text style={{color: 'white', marginRight: 10}}>
            Not found, Do you want to add
          </Text>
          {/* <Button title="Add" /> */}
          {/* FIXME: after save delete search and show the list again */}
          <TouchableOpacity onPress={() => saveNewExerciseMaster(search)}>
            <Image source={assets.icn_add} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{paddingBottom: 72, marginTop: 20}}>
          {/* Exercise List */}
          <View style={style.preListContainerStyle}>
            {searchResult?.map(item => (
              <ExerciseSelectRow
                key={item.id}
                item={item}
                checkIfExerSelected
                exercises={exercises}
              />
            ))}
          </View>
          {/* OK Button */}
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
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
        </ScrollView>
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
  preListContainerStyle: {
    // flex: 1,
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
});

export default ExerciseScreen;
