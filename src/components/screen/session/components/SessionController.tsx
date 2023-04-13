import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// Assets
import {colors, assets} from 'src/assets';

// Components
import SessionTimerLabel from './SessionTimerLabel';
import {useStopwatch} from 'src/components/hooks/timer-hook';
import GeneralModal from '../../../shared/GeneralModal';

import {useNavigation} from '@react-navigation/native';

import {useGstore} from '../../../../../gstore';
import useSessionStore from 'src/store/useSessionStore';

const SessionController = ({workoutId}) => {
  const registerSession = useSessionStore(s => s.registerSession);
  const setTime = useGstore(state => state.setTime);
  const [isActive, setIsActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
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

  useEffect(() => {
    start();
    setTime(new Date(Date.now()));
  }, []);

  const endSeassionAction = () => {
    setModalVisible(!modalVisible);
    // stop session timer
    pause();
    // Register session
    registerSession(
      {
        hours: {hours},
        minutes: {minutes},
        seconds: {seconds},
      },
      workoutId,
    );
    // Show report modal
    navigation.navigate('VReportScreen');
  };

  return (
    <>
      <GeneralModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        message="Are you sure you want to end your Workout Session?"
        action={endSeassionAction}
      />
      <View className="absolute bottom-1 w-full z-50">
        <View style={style.innerContainer}>
          <TouchableOpacity
            onPress={() => {
              // Ask user if wants quite
              setModalVisible(true);
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
    </>
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default SessionController;
