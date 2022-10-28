import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';
// Assets
import {colors, assets} from '../components/constants';

// Components
import SessionTimerLabel from './SessionTimerLabel';
import {useStopwatch} from '../components/timer-hook/';

import {useNavigation} from '@react-navigation/native';

import {useGstore} from '../gstore';

const SessionController = () => {
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigation();
  const {seconds, minutes, hours, days, start, pause, reset} = useStopwatch({
    autoStart: false,
  });

  function toggleSession() {
    if (isActive) {
      pause();
    } else {
      start();
    }
    setIsActive(!isActive);
  }

  return (
    <View className="absolute bottom-1 w-full z-50">
      <View style={style.innerContainer}>
        <TouchableOpacity
          onPress={() => {
            // Stop timer
            // Ask user if wants quite
            // Register session
            navigation.goBack();
          }}>
          <Image
            source={assets.icn_remove2}
            style={{height: 33, width: 33}}
            resizeMode="stretch"
          />
        </TouchableOpacity>
        <Text style={style.timerLabelStyle}>
          {hours}:{minutes}:{seconds}
        </Text>
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity onPress={toggleSession}>
            <Image
              source={isActive ? assets.icn_pause : assets.icn_start}
              style={{width: 20, height: 20}}
              tintColor="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  innerContainer: {
    // display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: colors.semiPrimary,
  },
  timerLabelStyle: {
    textAlign: 'center',
    fontSize: 35,
    fontWeight: 'bold',
    color: 'yellow',
  },
});

export default SessionController;
