import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from '../components/constants';
import {useGstore} from '../gstore';
import {getExerciseName} from '../components/shared';
import {getWorkoutObject} from '../components/shared';
import * as Icons from 'react-native-heroicons/outline';
import Divider from '../components/Divider';
import {convertDate} from '../components/shared';
import moment from 'moment';

const SessionReport = ({session}) => {
  return (
    <View>
      <Text style={{color: colors.white}}>{session.length}</Text>
      <Text style={{fontSize: 30, color: colors.white}}>
        {moment(session.datetime).format('DD MMM YYYY  h:mm:ss a')}
      </Text>
      <Text style={style.generalFontSize}>
        {moment(session.startTime).format('h:mm:ss a')} -{' '}
        {moment(session.endTime).format('h:mm:ss a')}
      </Text>
      <Divider />
      <Text style={style.generalFontSize}>Total Time</Text>
      <Text style={{color: colors.yellow, fontSize: 35, fontWeight: 'bold'}}>
        {session.duration.hours.hours}:{session.duration.minutes.minutes}:
        {session.duration.seconds.seconds}
      </Text>
      <Divider />
      <Text style={style.generalFontSize}>Routine Name</Text>
      <Text style={style.generalFontSize}>
        {getWorkoutObject(session.workoutId).title}
      </Text>
      <Divider />
      {session.exercises.map((e, i) => {
        return (
          <View key={i}>
            <Text style={style.generalFontSize}>
              {getExerciseName(e.exerciseID)}
            </Text>
            <Text style={style.generalFontSize}>
              {e.set.length} {e.set.length > 1 ? 'Sets' : 'Set'}
            </Text>
            {e.set.map((s, i) => {
              return (
                <Text key={i} style={{color: 'white'}}>
                  {s.reps}
                </Text>
              );
            })}
            <Divider />
          </View>
        );
      })}
    </View>
  );
};

export default SessionReport;

const style = StyleSheet.create({
  // ScrollViewStyle: {
  //   padding: 20,
  // },
  headerStyle: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#1a2421',
  },
  headerTextStyle: {
    fontSize: 35,
    color: colors.white,
  },
  generalFontSize: {
    fontSize: 20,
    color: colors.white,
  },
  doneButtonStyle: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.yellow,
    marginHorizontal: 20,
    borderRadius: 10,
  },
});