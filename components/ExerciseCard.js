import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from '../components/constants';

// components
import SETsController from './SETsController';
import LinearGradient from 'react-native-linear-gradient';

const ExerciseCard = ({exercise, exData, addFreq}) => {
  const [exerObj, setExerObj] = useState({
    id: exercise.id,
    set: 0,
    rep: 0,
  });
  const [set, setSet] = useState(exercise.freq.length);
  const [rep, setRep] = useState([15, 12, 12, 10]);
  const [showDone, setShowDone] = useState(false);

  const SaveFreq = () => {
    console.log(set);
  };

  const onChangeSet = () => {
    setExerObj({...exerObj, set: set});
    console.log(exerObj);
  };
  const onChangeRep = () => {
    setExerObj({...exerObj, rep: rep});
  };

  const addSet = () => {
    setSet(set + 1);
    setShowDone(true);
  };

  const minSet = () => {
    if (set === 0) {
      setSet(0);
      setShowDone(false);
    } else {
      setSet(set - 1);
    }
  };

  const RepControllerComponent = () => {
    const rows = [];
    for (let i = 0; i < set; i++) {
      rows.push(
        <SETsController
          key={i}
          freq={exercise.freq}
          index={i}
          addFreq={addFreq}
          indicatorTitle={'SET ' + (i + 1)}
        />,
      );
    }
    return <>{rows}</>;
  };

  /* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
  const getExerciseName = id => {
    let exername = exData.filter(element => {
      return element.id === id;
    });
    return exername[0].title;
  };

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

          <Text style={style.middleTextStyle}>Sets</Text>

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

      {RepControllerComponent()}

      <View style={{opacity: showDone ? 1 : 0}}>
        <TouchableOpacity
          onPress={() => {
            SaveFreq();
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
      </View>
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

export default ExerciseCard;
