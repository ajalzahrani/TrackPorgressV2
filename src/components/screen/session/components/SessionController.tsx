import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
// Assets
import {colors, assets} from 'src/assets';

// Components
import SessionTimerLabel from './SessionTimerLabel';
import {useStopwatch} from 'src/components/hooks/timer-hook';
import GeneralModal from '../../../shared/GeneralModal';

// Store
import useSessionStore from 'src/store/useSessionStore';

// Navigation
import {useNavigation} from '@react-navigation/native';
import {RoutineStackRootParamList} from 'src/components/navigation/RoutineStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type SessionScreenNavigationProp = NativeStackNavigationProp<
  RoutineStackRootParamList,
  'SessionScreen'
>;

type SessionControllerType = {
  sessionId: string;
  workoutId: string;
};

const SessionController = ({sessionId, workoutId}: SessionControllerType) => {
  const registerSession = useSessionStore(s => s.registerSession);
  const startTimeRef = useRef<number>();

  const [isActive, setIsActive] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<SessionScreenNavigationProp>();
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
    startTimeRef.current = Date.now();
  }, []);

  const endSeassionAction = () => {
    setModalVisible(!modalVisible);
    // stop session timer
    pause();
    // Register session

    registerSession(
      sessionId,
      new Date().toString(),
      hours + ':' + minutes + ':' + seconds,
      startTimeRef.current?.toString() || '',
      Date.now().toString(),
      workoutId,
      [],
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
      <View
      // className="absolute bottom-1 w-full z-50"
      >
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
