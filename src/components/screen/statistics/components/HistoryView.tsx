import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {colors} from 'src/assets';
import Calendars from './Calendars';
import SessionReport from 'src/components/screen/sessionReport/SessionReportScreen';

const HistoryView = () => {
  // const getSessionByDate = useGstore(state => state.getSessionByDate);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [sess, setSess] = useState([]);
  useEffect(() => {
    if (selectedDate !== undefined) {
      // setSess(getSessionByDate(selectedDate));
    }
  }, [selectedDate]);
  return (
    <View style={{flex: 1, margin: 20}}>
      <ScrollView contentContainerStyle={{paddingBottom: 72}}>
        <Calendars setSelectedDate={setSelectedDate} />
        <Text style={{color: colors.white}}>
          {sess.length} {sess.length > 1 ? 'Sessions' : 'Session'}
        </Text>
        {sess.length > 0 &&
          sess.map((item, i) => {
            return (
              <View
                key={i}
                style={{
                  backgroundColor: colors.secondaryow,
                  padding: 20,
                  marginTop: 20,
                  borderRadius: 12,
                }}>
                <SessionReport session={item} />
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default HistoryView;
//<SessionReport key={i} session={item} />;
