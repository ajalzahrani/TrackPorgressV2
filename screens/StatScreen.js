import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colors} from '../components/constants';
import {sizes} from '../components/constants';
import {useGstore} from '../gstore';
import Calendars from '../components/Calendars';
import SessionReport from '../components/SessionReport';
import moment from 'moment';

const StatScreen = () => {
  const [selectedDate, setSelectedDate] = useState();
  const getSessionByDate = useGstore(state => state.getSessionByDate);
  const [isLoaded, setIsLoaded] = useState(false);
  const [sess, setSess] = useState();

  useEffect(() => {
    console.log('selectedDay: ', selectedDate);
    if (selectedDate !== undefined) {
      setSess(getSessionByDate(selectedDate));
      setIsLoaded(state => !state);
    }
  }, [selectedDate]);

  return (
    <SafeAreaView style={style.safeViewStyle}>
      <View className="p-5">
        <TouchableOpacity
          onPress={() => console.log('sess: ', sess)}
          style={style.titleViewStyle}>
          <Text style={style.titleStyle}>Statistics</Text>
        </TouchableOpacity>
        <Calendars setSelectedDate={setSelectedDate} />
        {/* <Text style={style.supTitleStyle}>Sessions done</Text>
        <Text style={style.detailStyle}>
          {sss.length} {sss.length === 1 ? 'session' : 'sessions'}
        </Text> */}
        {isLoaded &&
          sess.map((item, i) => {
            return <SessionReport key={i} session={item} />;
          })}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  titleStyle: {
    color: colors.white,
    fontSize: 30,
  },
  titleViewStyle: {
    alignItems: 'center',
    marginBottom: 20,
  },
  supTitleStyle: {
    fontSize: sizes.extraLarge,
    color: colors.white,
    marginTop: 20,
  },
  detailStyle: {
    fontSize: sizes.medium,
    color: colors.yellow,
  },
});
export default StatScreen;
