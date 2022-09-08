import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

import {SafeAreaView, ScrollView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';

// Assets
import {colors, assets} from '../components/constants';

// components
import SETsController from './SETsController';

const ExerciseCard = ({exercise, exData}) => {
  const [exerObj, setExerObj] = useState({
    id: exercise.id,
    set: 0,
    rep: 0,
  });
  const [set, setSet] = useState(0);
  const [rep, setRep] = useState(0);

  const onChangeSet = () => {
    setExerObj({...exerObj, set: set});
    console.log(exerObj);
  };
  const onChangeRep = () => {
    setExerObj({...exerObj, rep: rep});
  };

  const addSet = () => {
    setSet(set + 1);
  };

  const addRep = () => {
    setRep(rep + 1);
  };

  const minSet = () => {
    if (set === 0) {
      setSet(0);
    } else {
      setSet(set - 1);
    }
  };

  const minRep = () => {
    if (rep === 0) {
      setRep(0);
    } else {
      setRep(rep - 1);
    }
  };

  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = id => {
    let exername = exData.filter(element => {
      return element.id === id;
    });
    return exername[0].title;
  };

  useEffect(() => {
    onChangeRep();
    onChangeSet();
  }, [set, rep]);

  return (
    <View style={style.cardContainer}>
      {/* Exercise Titile */}
      <Text style={style.exerciseTitleStyle}>
        {getExerciseName(exercise.id)}
      </Text>

      {/* <SETsController indicatorTitle={'Set'} /> */}
      <View style={style.containerStyle}>
        {/* inner set container */}
        <View style={style.innerContainerStyle}>
          {/* Number indicator */}
          <View style={style.numberIndicator}>
            <Text style={{color: colors.white}}>{set}</Text>
          </View>

          <Text style={style.middleTextStyle}>SETs</Text>

          {/* plus - min buttons */}
          <View style={{flexDirection: 'row'}} className="space-x-10">
            <TouchableOpacity
              onPress={() => {
                minSet();
              }}>
              <Image source={assets.icn_min} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addSet()}>
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

      {/* <SETsController indicatorTitle={'Rep'} /> */}
      <View style={style.containerStyle}>
        {/* inner set container */}
        <View style={style.innerContainerStyle}>
          {/* Number indicator */}
          <View style={style.numberIndicator}>
            <Text style={{color: colors.white}}>{rep}</Text>
          </View>

          <Text style={style.middleTextStyle}>REPs</Text>

          {/* plus - min buttons */}
          <View style={{flexDirection: 'row'}} className="space-x-10">
            <TouchableOpacity
              onPress={() => {
                minRep();
              }}>
              <Image source={assets.icn_min} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => addRep()}>
              <Image source={assets.icn_add} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <View>
        <TouchableOpacity>
          <Text>Done</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.secondaryow,
    borderRadius: 20,
  },
  exerciseTitleStyle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
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
});

export default ExerciseCard;
