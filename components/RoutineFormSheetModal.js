import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ScrollView,
  Image,
  Pressable,
  TextInput,
  Alert,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';

// Store
import useStore from '../store/useStore';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Assets
import {colors, assets} from '../components/constants';

// Components
import PressableButton from './PressableButton';

const RoutineFormSheetModal = ({modalVisible, setModalVisible}) => {
  const addNewRoutine = useStore(s => s.addNewRoutine);
  const [routienTitle, setRoutienTitle] = useState('');

  const navigation = useNavigation();

  const onPress = useCallback(() => {
    if (routienTitle.length !== 0) {
      addNewRoutine(routienTitle);
      setModalVisible(!modalVisible);
      navigation.navigate('ScheduleScreen');
    }
  });

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}
      presentationStyle={'formSheet'}>
      <View style={style.centeredView}>
        <Text style={style.modalText}>Configure new routine</Text>
        <TextInput
          placeholder="Routine title"
          placeholderTextColor={colors.offwhite}
          onChangeText={inpuText => setRoutienTitle(inpuText)}
          style={style.textInputStyle}
        />

        <PressableButton onPress={onPress} label="Okey" />
      </View>
    </Modal>
  );
};

export default RoutineFormSheetModal;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.primary,
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
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
  },
  textInputStyle: {
    backgroundColor: colors.offwhite,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 100,
    marginHorizontal: 30,
    marginTop: 47,
  },
});
