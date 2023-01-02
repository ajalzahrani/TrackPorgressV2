import {
  View,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
  Button,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';

// Store
import useStore from '../store/useStore';

// Navigation
import {useNavigation} from '@react-navigation/native';

// Assets
import {colors} from '../components/constants';

// Components
import PressableButton from '../components/PressableButton';
import DateTimePickers from '../components/DateTimePickers';
import Calendars2 from '../components/Calendars2';

const RoutineFormScreen = ({modalVisible, setModalVisible}) => {
  const addNewRoutine = useStore(s => s.addNewRoutine);
  const [routienTitle, setRoutienTitle] = useState('');
  const [routineDescription, setRoutineDescription] = useState('');
  const [startDay, setStartDay] = useState(null);
  const [endDay, setEndDay] = useState(null);
  const [isSelectDateClick, setIsSelectDateClick] = useState(false);
  const [selectLevelIndex, setSelectLevelIndex] = useState(0);
  const currentRoutine = useStore(s => s.currentRoutine);

  const navigation = useNavigation();

  useEffect(() => {
    console.log('current routine: ', currentRoutine);
  }, []);

  const restForm = () => {
    setRoutienTitle('');
    setRoutineDescription('');
    setStartDay(null);
    setEndDay(null);
    setIsSelectDateClick(false);
    setSelectLevelIndex(0);
  };

  const onPress = useCallback(() => {
    if (routienTitle.length !== 0) {
      addNewRoutine(routienTitle);
      setModalVisible(!modalVisible);
      restForm();
      navigation.navigate('ScheduleScreen');
    }
  });

  return (
    <View style={style.centeredView}>
      <Text style={style.modalText}>Configure new routine</Text>
      <TextInput
        placeholder="Routine title"
        placeholderTextColor={colors.offwhite}
        onChangeText={inpuText => setRoutienTitle(inpuText)}
        style={style.textInputStyle}
        defaultValue={currentRoutine?.title}
      />

      <PressableButton
        customStyle={{paddingHorizontal: 20}}
        label={
          isSelectDateClick
            ? 'Unselect start & end date'
            : 'Select start & end date'
        }
        onPress={() => setIsSelectDateClick(prev => !prev)}
      />

      {isSelectDateClick && (
        <Calendars2
          startDay={startDay}
          setStartDay={setStartDay}
          endDay={endDay}
          setEndDay={setEndDay}
        />
      )}

      {/* <DateTimePickers /> */}
      {/* <Text style={{color: colors.white, marginTop: 20}}>
          Start Date: {startDay}
        </Text>
        <Text style={{color: colors.white}}>End Date: {endDay}</Text> */}

      <SegmentedControl
        values={['Beginner', 'Intermediate', 'Professional']}
        selectedIndex={selectLevelIndex}
        onChange={event => {
          setSelectLevelIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        backgroundColor={colors.offwhite}
        appearance="light"
        style={{marginTop: 20, marginHorizontal: 50, marginBottom: 15}}
      />
      <TextInput
        style={[style.textInputStyle, style.richBox]}
        placeholder="Description"
        value={routineDescription}
        onChangeText={text => setRoutineDescription(text)}
        multiline={true}
        underlineColorAndroid="transparent"
      />
      <PressableButton onPress={onPress} label="Okey" />
    </View>
  );
};

export default RoutineFormScreen;

const style = StyleSheet.create({
  centeredView: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.primary,
    // alignItems: 'center',
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
    marginVertical: 20,
    textAlign: 'center',
    color: colors.white,
    fontSize: 24,
    fontSize: 30,
    fontWeight: '700',
    color: colors.white,
  },
  selectText: {
    color: colors.white,
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
    marginVertical: 20,
  },
  richBox: {
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
