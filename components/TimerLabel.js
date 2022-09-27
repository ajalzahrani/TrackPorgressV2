import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

const TimerLabel = ({
  seconds,
  setSeconds,
  isActive,
  setIsActive,
  reset,
  toggle,
}) => {
  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);

      if (seconds === 0) {
        toggle();
        console.log(`secon fi ${seconds}, ${isActive}`);
      }
    }
    // else if (!isActive && seconds === 0) {
    //   toggle();
    //   clearInterval(interval);
    // }

    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <View>
      <Text className="text-white text-lg">{seconds}</Text>
    </View>
  );
};

export default TimerLabel;
