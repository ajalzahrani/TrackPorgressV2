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

const RoutineFormScreen = () => {
  const currentRoutine = useStore(s => s.currentRoutine);
  const addNewRoutine = useStore(s => s.addNewRoutine);
  const updateCurrentRoutine = useStore(s => s.updateCurrentRoutine);
  const saveRoutine = useStore(s => s.saveRoutine);
  const [title, setTitle] = useState(currentRoutine?.title);
  const [description, setDescription] = useState(currentRoutine?.description);
  const [startDate, setStartDate] = useState(currentRoutine?.startDate);
  const [endDate, setEndDate] = useState(currentRoutine?.endDate);
  const [levelIndex, setLevelIndex] = useState(currentRoutine?.level);

  const navigation = useNavigation();

  // useEffect(() => {
  //   console.log(
  //     'current dates: ',
  //     currentRoutine?.startDate,
  //     currentRoutine?.endDate,
  //   );
  //   console.log('currentRoutine: ', currentRoutine);
  // }, []);

  const restForm = () => {
    setTitle('');
    setDescription('');
    setStartDate(null);
    setEndDate(null);
    setLevelIndex(0);
  };

  const onPress = useCallback(() => {
    if (title?.length !== 0) {
      if (currentRoutine?.id) {
        updateCurrentRoutine(
          title,
          startDate,
          endDate,
          levelIndex,
          description,
        );

        saveRoutine();
        navigation.goBack();
      } else {
        addNewRoutine(title, startDate, endDate, levelIndex, description);
        restForm();
        navigation.goBack();
        navigation.navigate('ScheduleScreen');
      }
    } else {
      console.log('Type in routine title');
    }
  });

  return (
    <View style={style.centeredView}>
      <Text style={style.modalText}>Configure new routine</Text>

      <TextInput
        placeholder="Routine title"
        placeholderTextColor={colors.offwhite}
        onChangeText={inpuText => setTitle(inpuText)}
        style={style.textInputStyle}
        defaultValue={title}
      />

      <Calendars2
        startDay={startDate}
        setStartDay={setStartDate}
        endDay={endDate}
        setEndDay={setEndDate}
      />

      <SegmentedControl
        values={['Beginner', 'Intermediate', 'Professional']}
        selectedIndex={levelIndex}
        onChange={event => {
          setLevelIndex(event.nativeEvent.selectedSegmentIndex);
        }}
        backgroundColor={colors.offwhite}
        appearance="light"
        style={{marginTop: 20, marginHorizontal: 50, marginBottom: 15}}
      />

      <TextInput
        style={[style.textInputStyle, style.richBox]}
        placeholder="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline={true}
        underlineColorAndroid="transparent"
      />

      <PressableButton onPress={onPress} title="Okey" />
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
