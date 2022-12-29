import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useMemo, useState, useLayoutEffect} from 'react';
import produce from 'immer';

import {colors} from './constants';

// Store
import useStore from '../store/useStore';

const dayButton = [
  {id: 0, ispicked: false, istoday: false},
  {id: 1, ispicked: false, istoday: false},
  {id: 2, ispicked: false, istoday: false},
  {id: 3, ispicked: false, istoday: false},
  {id: 4, ispicked: false, istoday: false},
  {id: 5, ispicked: false, istoday: false},
  {id: 6, ispicked: false, istoday: false},
];

const CalenderRow = () => {
  const weekdays = useStore(s => s.weekdays);
  const selectCurrentWorkout = useStore(s => s.selectCurrentWorkout);
  const selectScheduledWorkout = useStore(s => s.selectScheduledWorkout);
  const selectCurrentDay = useStore(s => s.selectCurrentDay);
  const {currentDay} = useState();
  const [db, setDB] = useState(dayButton);

  const generateWorkdays = () => {
    const array = weekdays?.map(day => {
      return (
        <View
          key={day.id}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <TouchableOpacity
            key={day.id}
            onPress={() => {
              selectCurrentDay(day.id);
              selectCurrentWorkout(day.workout);
              selectScheduledWorkout(day.workout);
              setDB(
                produce(draft => {
                  draft.forEach(day => (day.ispicked = false));
                  draft[day.id].ispicked = true;
                }),
              );
            }}
            style={[
              {
                display: 'flex',
                backgroundColor: day.workday
                  ? colors.secondary
                  : colors.offwhite,
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 30,

                height: db[day.id].ispicked ? 44 : 44,
                width: db[day.id].ispicked ? 65 : 44,
                order: 6,
                flexGrow: 0,
              },
              {
                // shadowColor: db[day.id].ispicked ? '#fff' : '#000',
                // shadowOffset: {width: 0, height: 20},
                // shadowOpacity: 0.58,
                // shadowRadius: 16.0,
                // elevation: 24,
              },
            ]}>
            <Text style={style.textSytle}>{day.symbol}</Text>
          </TouchableOpacity>
          <View
            style={
              db[day.id].istoday
                ? {
                    marginTop: 2,
                    padding: 2,
                    backgroundColor: colors.secondary,
                    borderRadius: 20,
                  }
                : {}
            }></View>
        </View>
      );
    });
    return <>{array}</>;
  };

  const handleWhichDay = () => {
    let date = new Date().getDay();
    setDB(
      produce(draft => {
        draft.forEach(day => {
          day.ispicked = false;
          day.istoday = false;
        });
        draft[date].istoday = true;
        draft[date].ispicked = true;
      }),
    );

    // if current day has scheduled workout then select workout
    const dayId = new Date().getDay();
    const currentDayWorkout = weekdays[dayId]?.workout;
    selectCurrentDay(dayId);
    selectScheduledWorkout(currentDayWorkout);
  };

  useEffect(() => {
    handleWhichDay();
  }, []);

  return (
    // <View className="flex-row justify-around pt-5 mx-3">
    <View style={style.containerStyle}>{generateWorkdays()}</View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 0,
    marginTop: 26,
    marginHorizontal: 16,
    // position: 'absolute',
    // width: 358,
    // height: 44,
    // left: 16,
    // top: 100,
  },
  touchableOpacityStyle: {
    display: 'flex',
    backgroundColor: colors.offwhite,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 44,
    width: 44,
    order: 6,
    flexGrow: 0,
  },
  textSytle: {
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 24,
    lineHeight: 36,
    textAlign: 'center',
    color: colors.white,
  },
});

export default CalenderRow;
