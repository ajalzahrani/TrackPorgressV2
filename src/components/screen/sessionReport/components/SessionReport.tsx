import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors} from 'src/assets';

// Components
import {getExerciseName} from 'src/components/shared';
import * as Icons from 'react-native-heroicons/outline';
import Divider from 'src/components/shared/Divider';
import {convertDate} from 'src/components/shared';
import moment from 'moment';

import {sessionType} from 'src/types';
type SessionReportProp = {
  session: sessionType;
};

const SessionReport: React.FC<SessionReportProp> = ({session}) => {
  return (
    <View>
      {/* <Text style={{color: colors.white}}>{session.length}</Text> */}
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
        {/* {session.duration.hours.hours}:{session.duration.minutes.minutes}:
        {session.duration.seconds.seconds} */}
        {session.duration}
      </Text>
      <Divider />
      <Text style={style.generalFontSize}>Routine Name</Text>
      <Text style={style.generalFontSize}>
        {/* {getWorkoutObject(session.workoutId).title} */}
      </Text>
      <Divider />
      {session.exercise.map((exercise, i) => {
        return (
          <View key={i}>
            <Text style={style.generalFontSize}>
              {getExerciseName(exercise.exerciseId)}
            </Text>
            <Text style={style.generalFontSize}>
              {exercise.set.length} {exercise.set.length > 1 ? 'Sets' : 'Set'}
            </Text>
            {exercise.set.map((s, i) => {
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
