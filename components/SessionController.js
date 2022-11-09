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
import {colors, assets} from '../components/constants';

// Components
import SessionTimerLabel from './SessionTimerLabel';
import {useStopwatch} from '../components/timer-hook/';

import {useNavigation} from '@react-navigation/native';

import {useGstore} from '../gstore';

const SessionController = ({workoutId}) => {
  const registerSession = useGstore(state => state.registerSession);
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

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>
              Are you sure you want to end your Workout Session?
            </Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => {
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
              }}>
              <Text style={style.textStyle}>Yes</Text>
            </Pressable>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}>
              <Text style={style.textStyle}>No</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    // backgroundColor: '#2196F3',
    backgroundColor: colors.secondary,
    marginBottom: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default SessionController;
