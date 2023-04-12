import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useTimer} from 'src/components/hooks/timer-hook';

type TimerLableType = {
  seconds: number;
  setSeconds: (seconds: number) => void;
  isActive: boolean;
  toggle: () => void;
};

const TimerLabel: React.FC<TimerLableType> = ({
  seconds,
  setSeconds,
  isActive,
  toggle,
}) => {
  // FIXME: use timer-hook here

  // useEffect(() => {
  //   let interval: number = -1;
  //   if (isActive) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds - 1);
  //     }, seconds * 1000);

  //     if (seconds === 0) {
  //       toggle();
  //     }
  //   }

  //   return () => clearInterval(interval);
  // }, [isActive, seconds]);

  return (
    <View>
      <Text style={styles.text}>{seconds > 0 ? seconds : '--'}</Text>
    </View>
  );
};

export default TimerLabel;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    color: 'white',
  },
});
