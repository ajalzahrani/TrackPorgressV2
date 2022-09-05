import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {store} from '../Store';
import uuid from 'react-native-uuid';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

// components
import Divider from '../components/Divider';
import ExerciseSelectRow from '../components/ExerciseSelectRow';
import {useNavigation} from '@react-navigation/native';
import AddExerciseModle from '../components/AddExerciseModle';

const ExerciseScreen = ({route}) => {
  const [exData, setEXData] = useState([]); // state holding exercise data.
  const [search, setSearch] = useState(''); //
  const [searchResult, setSearchResult] = useState();
  const [notFound, setNotFound] = useState(false); // handle if no exercise found in search
  const [exerciseList, setExerciseList] = useState([]); // handle user exercises selection.
  const [dayObject, setDayObject] = useState({}); // hold day object.

  const navigation = useNavigation();

  const getDayObject = () => {
    var date = new Date();
    date.setDate(date.getDate() - 0); // add day
    const todayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name

    const dayObject = JSON.parse(store.getString(todayName));

    setDayObject(dayObject);
  };

  // search the list of exercises data and eanble the user to add not found exercies.
  const handleSearch = searchText => {
    setSearch(searchText);
    const filterdExercies = exData.filter((exer, index) => {
      // console.log(exer.title.match(searchText));
      return exer.title.match(searchText);
    });
    if (searchText.length === 0) {
      setSearchResult(exData);
      setNotFound(false);
    } else if (filterdExercies.length === 0) {
      setNotFound(true);
    } else {
      setSearchResult(filterdExercies);
      setNotFound(false);
    }
  };

  // Add new Exercises to exercise data list
  const insertNewExercise = () => {
    const newExercise = {
      id: uuid.v4(),
      title: search,
    };
    exData.push(newExercise);
    store.set('exercises', JSON.stringify(exData));
    setNotFound(false);

    console.log(newExercise, ' Saved successfully.');
  };

  // save selected exercises to dayObject.
  function saveSelectedExercises() {
    // take exercies array from exerciseList stat
  }

  // handleExerciseSelection function is taking exercise id and return an array of selected exercises.
  // to be pass to childeren to collect selected exercise.
  function handleExerciseSelection(id) {
    let array = exerciseList;
    let isRemoved = false;
    for (let i = 0; i < array.length; i++) {
      if (array[i] === id) {
        let index = array.indexOf(id);
        if (index !== -1) {
          array.splice(index, 1);
          setExerciseList(array);
          isRemoved = true;
        }
        // setExerciseList(prev => prev.filter((_, index) => index !== id));
      }
    }
    if (isRemoved === false) {
      setExerciseList(prev => [...prev, id]);
    }
  }

  useEffect(() => {
    // get exercise data from DB
    const exerciseData = JSON.parse(store.getString('exercises'));
    setEXData(exerciseData);
    setSearchResult(exerciseData);

    // get a day object
    getDayObject();
  }, []);

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View style={{paddingHorizontal: 16, flex: 1}}>
        {/* TextInput component */}
        <TextInput
          placeholder="Exercise name"
          placeholderTextColor={colors.offwhite}
          onChangeText={handleSearch}
          value={search}
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
          <TouchableOpacity onPress={() => insertNewExercise()}>
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
                // Logic how to pass props throw navigation >> continue to next component
                // get object propreties and pass them to desired component
                // selectExercise={addExercies.selectExercise}
                checkIfExerSelected
                handleExerciseSelection={handleExerciseSelection}
              />
            ))}
          </View>
          {/* OK Button */}
          <TouchableOpacity
            onPress={() => {
              saveSelectedExercises();
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
});

export default ExerciseScreen;
