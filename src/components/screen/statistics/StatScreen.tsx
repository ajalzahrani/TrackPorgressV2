import {View, SafeAreaView, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {colors} from '../components/constants';
import ProgressView from '../components/statScreenCompo/ProgressView';
import HistoryView from '../components/statScreenCompo/HistoryView';
import StatisticView from '../components/statScreenCompo/StatisticView';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

const StatScreen = () => {
  // FIXME: Adjust the design
  const [selectedIndex, setSelectedIndex] = useState(0);

  const renderView = () => {
    if (selectedIndex == 0) {
      return <HistoryView />;
    } else if (selectedIndex == 1) {
      return <ProgressView />;
    } else if (selectedIndex == 2) {
      return <StatisticView />;
    }
  };

  return (
    <SafeAreaView style={style.safeViewStyle}>
      <View className="flex-1">
        <View className="mx-5">
          <SegmentedControl
            values={['History', 'Progress', 'Statistic']}
            selectedIndex={selectedIndex}
            onChange={event => {
              setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
            }}
            backgroundColor={colors.offwhite}
            appearance="light"
            style={{marginTop: 10, marginHorizontal: 50, marginBottom: 15}}
          />
        </View>
        {renderView()}
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
});
export default StatScreen;
