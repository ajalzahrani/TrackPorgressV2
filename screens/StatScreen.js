import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {colors} from '../components/constants';
import {sizes} from '../components/constants';
import {useGstore} from '../gstore';
import Calendars from '../components/Calendars';
import SessionReport from '../components/SessionReport';
import * as Icons from 'react-native-heroicons/outline';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit';

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
    <>
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
    </>
  );
};

const data = {
  labels: ['Jan', 'February', 'March', 'April', 'May', 'June', 'Jul'],
  datasets: [
    {
      data: [10, 45, 28, 80, 99, 43],
    },
  ],
};

const StaticView = () => {
  return (
    <View>
      <Text>Bezier Line Chart</Text>
      <LineChart
        // data={{
        //   labels: ['January', 'February', 'March', 'April', 'May', 'June'],
        //   datasets: [
        //     {
        //       data: [
        //         Math.random() * 100,
        //         Math.random() * 100,
        //         Math.random() * 100,
        //         Math.random() * 100,
        //         Math.random() * 100,
        //         Math.random() * 100,
        //       ],
        //     },
        //   ],
        // }}
        data={data}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
const StatScreen = () => {
  // FIXME: Adjust the design

  const [isLoaded, setIsLoaded] = useState(false);

  const [iconClick, setIconClick] = useState(false);

  return (
    <SafeAreaView style={style.safeViewStyle}>
      <View className="p-5 flex-1">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            // backgroundColor: colors.greeny,
          }}>
          <View>{/* <Text>hell</Text> */}</View>
          <TouchableOpacity
            onPress={() => console.log('sess: ', sess)}
            style={style.titleViewStyle}>
            <Text style={style.titleStyle}>Statistics</Text>
          </TouchableOpacity>
          {/* <Icons.CalendarIcon style={{color: colors.white}} /> */}
          <TouchableOpacity onPress={() => setIconClick(state => !state)}>
            {!iconClick ? (
              <Icons.ChartPieIcon style={{color: colors.white}} />
            ) : (
              <Icons.CalendarIcon style={{color: colors.white}} />
            )}
          </TouchableOpacity>
        </View>
        {iconClick ? <HistoryView /> : <StaticView />}
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
