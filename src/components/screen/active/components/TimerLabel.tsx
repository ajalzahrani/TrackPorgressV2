import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

const TimerLabel = ({
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
    let interval = null;
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
      <Text className="text-white text-lg">{seconds > 0 ? seconds : '--'}</Text>
    </View>
  );
};

export default TimerLabel;
