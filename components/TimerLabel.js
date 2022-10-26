import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

const TimerLabel = ({
  seconds,
  setSeconds,
  isActive,
  toggle,
  scrollToNextCard,
  setIsPressed,
  index,
  isPressed,
}) => {
  // FIXME: use timer-hook here
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);

      if (seconds === 0) {
        toggle();
        scrollToNextCard(index);
        setIsPressed(!isPressed);
        console.log(`secon fi ${seconds}, ${isActive}`);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View>
      <Text className="text-white text-lg">{seconds}</Text>
    </View>
  );
};

export default TimerLabel;
