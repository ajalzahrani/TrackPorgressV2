import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useGstore} from '../../gstore';
import {colors} from '../constants';
import Calendars from '../Calendars';
import SessionReport from '../SessionReport';

const HistoryView = () => {
  const getSessionByDate = useGstore(state => state.getSessionByDate);
  const [selectedDate, setSelectedDate] = useState();
  const [sess, setSess] = useState([]);
  useEffect(() => {
    if (selectedDate !== undefined) {
      setSess(getSessionByDate(selectedDate));
    }
  }, [selectedDate]);
  return (
    <View style={{margin: 20}}>
      <Calendars setSelectedDate={setSelectedDate} />
      <Text style={{color: colors.white}}>
        {sess.length} {sess.length > 1 ? 'Sessions' : 'Session'}
      </Text>
      <ScrollView contentCScrollViewontainerStyle={{paddingBottom: 72}}>
        {sess.length > 0 &&
          sess.map((item, i) => {
            return <SessionReport key={i} session={item} />;
          })}
      </ScrollView>
    </View>
  );
};

export default HistoryView;
