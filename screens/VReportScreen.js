import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {assets, colors} from '../components/constants';
import {convertDate} from '../components/shared';
import {useGstore} from '../gstore';
import {getExerciseName} from '../components/shared';
import {getWorkoutObject} from '../components/shared';
import {SparklesIcon as SparklesIconOutline} from 'react-native-heroicons/outline';
import * as Icons from 'react-native-heroicons/outline';
import Divider from '../components/Divider';

const VReportScreen = () => {
  const lastSession = useGstore(state => state.lastSession);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.saveAreaStyle}>
      <View style={style.headerStyle}>
        {/* <Image source={assets.icn_rightarrow} /> */}
        <Icons.CheckCircleIcon color={colors.yellow} size={200} />
        <Text style={style.headerTextStyle}>Workout Summary</Text>
      </View>
      <ScrollView style={style.ScrollViewStyle}>
        <Divider />
        <Text style={style.generalFontSize}>
          {lastSession().datetime.toDateString()}
        </Text>
        <Text style={style.generalFontSize}>
          {lastSession().startTime.toLocaleTimeString()} -{' '}
          {lastSession().endTime.toLocaleTimeString()}
        </Text>
        <Divider />
        <Text style={style.generalFontSize}>Total Time</Text>
        <Text style={{color: colors.yellow, fontSize: 35, fontWeight: 'bold'}}>
          {lastSession().duration.hours.hours}:
          {lastSession().duration.minutes.minutes}:
          {lastSession().duration.seconds.seconds}
        </Text>
        <Divider />
        <Text style={style.generalFontSize}>Routine Name</Text>
        <Text style={style.generalFontSize}>
          {getWorkoutObject(lastSession().workoutId).title}
        </Text>
        <Divider />
        {lastSession().exercises.map((e, i) => {
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
      </ScrollView>
      <TouchableOpacity
        style={style.doneButtonStyle}
        onPress={() => {
          navigation.navigate('ScheduleScreen');
        }}>
        <Text style={{fontSize: 20}}>Done</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  saveAreaStyle: {
    flex: 1,
    backgroundColor: '#1a2421',
  },
  ScrollViewStyle: {
    padding: 20,
  },
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

export default VReportScreen;
