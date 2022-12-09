import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {colors} from '../components/constants';
import {useGstore} from '../gstore';
('react-native-heroicons/outline');
import * as Icons from 'react-native-heroicons/outline';
import SessionReport from '../components/SessionReport';

const VReportScreen = () => {
  // FIXME: Adjust the design to be consist
  const getLastSession = useGstore(state => state.getLastSession);
  const navigation = useNavigation();
  return (
    <SafeAreaView style={style.saveAreaStyle}>
      <View style={style.headerStyle}>
        {/* <Image source={assets.icn_rightarrow} /> */}
        <Icons.CheckCircleIcon color={colors.yellow} size={200} />
        <Text style={style.headerTextStyle}>Workout Summary</Text>
      </View>
      {/* <View className="p-5">
        <SessionReport session={getLastSession()} />
      </View> */}
      <ScrollView
        style={{padding: 20}}
        contentCScrollViewontainerStyle={{paddingBottom: 72}}>
        <SessionReport session={getLastSession()} />
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
  headerStyle: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#1a2421',
  },
  headerTextStyle: {
    fontSize: 35,
    color: colors.white,
  },
  doneButtonStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 20,
    backgroundColor: colors.yellow,
    borderRadius: 10,
  },
});

export default VReportScreen;