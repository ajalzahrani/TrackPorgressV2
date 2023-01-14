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
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from '../components/constants';

// components
import ExerciseSelectRow from '../components/ExerciseSelectRow';

// Store
import useStore from '../store/useStore';
import ExerciseApi from '../components/database/ExerciseApiShort.json';

const ExerciseScreen = () => {
  // FIXME: presis exercise selection when search
  // FIXME: auto select new added exercise
  const exercisesMaster = useStore(s => s.exercisesMaster);
  const saveNewExerciseMaster = useStore(s => s.saveNewExerciseMaster);
  const [search, setSearch] = useState(''); //
  const [searchResult, setSearchResult] = useState(ExerciseApi);
  const [notFound, setNotFound] = useState(false); // handle if no exercise found in search

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
    <SafeAreaView style={style.safeViewStyle}>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        {/* TextInput component */}
        <TextInput
          placeholder="Exercise name"
          placeholderTextColor={colors.offwhite}
          onChangeText={handleSearch}
          value={search}
          style={style.textInputStyle}
        />
        {notFound && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              // opacity: notFound ? 1 : 0,
            }}>
            <Text style={{color: 'white', marginRight: 10}}>
              Not found, Do you want to add
            </Text>
            {/* <Button title="Add" /> */}
            {/* FIXME: after save delete search and show the list again */}
            <TouchableOpacity
              onPress={() => {
                setNotFound(false);
                setSearch('');
                saveNewExerciseMaster(search);
                setSearchResult(exercisesMaster);
              }}>
              <Image source={assets.icn_add} />
            </TouchableOpacity>
          </View>
        )}

        <ScrollView contentContainerStyle={{paddingBottom: 72, marginTop: 20}}>
          {/* Exercise List */}
          <View style={style.preListContainerStyle}>
            {searchResult?.map(item => (
              <ExerciseSelectRow key={item.id} item={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
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
