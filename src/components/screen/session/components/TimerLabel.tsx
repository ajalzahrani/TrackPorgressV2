import {View, StyleSheet, Text} from 'react-native';
import React, {useEffect} from 'react';

type TimerLableType = {
  seconds: number;
  setSeconds: (seconds: number) => number;
  isActive: boolean;
  toggle: () => void;
  index: number;
  scrollToNextCard: () => void;
  isPressed: boolean;
  setIsPressed: () => void;
  setSkitchTitle: () => void;
};
const TimerLabel: React.FC<TimerLableType> = ({
  seconds,
  setSeconds,
  isActive,
  toggle,
  index,
  scrollToNextCard,
  isPressed,
  setIsPressed,
  setSkitchTitle,
}) => {
  // FIXME: use timer-hook here
  useEffect(() => {
    let interval: number = -1;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);

      if (seconds === 0) {
        toggle();
        scrollToNextCard(index);
        setIsPressed(!isPressed);
        setSkitchTitle(true);
        // console.log(`secon fi ${seconds}, ${isActive}`);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

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
