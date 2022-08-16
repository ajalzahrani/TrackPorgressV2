import {
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Button,
  Keyboard,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Reinput from 'reinput';
import DateTimePickerModal from '@react-native-community/datetimepicker';

const SettingsScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [gender, setGender] = useState('');

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    hideDatePicker();
  };
  return (
    <SafeAreaView className="bg-gray-200 flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Gender ?</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setGender('Female');
              }}>
              <Text style={styles.textStyle}>Female</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(!modalVisible);
                setGender('Male');
              }}>
              <Text style={styles.textStyle}>Male</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View className="p-5">
        <Reinput label="Firstname" />
        <Reinput label="Lastname" />
        <TouchableOpacity
          onPress={showDatePicker}
          className=" border-black border-b-2 p-1 mb-8">
          <Text>
            DOB:{' '}
            {selectedDate
              ? selectedDate.toLocaleDateString()
              : 'Enter your DOB'}
          </Text>
        </TouchableOpacity>
        {/* <Button title="Select a date" onPress={showDatePicker} /> */}
        <DateTimePickerModal
          date={selectedDate}
          isVisible={datePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <TouchableOpacity
          onPress={() => setModalVisible(true)}
          className=" border-black border-b-2 p-1 mb-8">
          <Text>Gender: {gender}</Text>
        </TouchableOpacity>
        <Reinput label="City" />
        <Reinput label="Email" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    backgroundColor: '#2196F3',
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

export default SettingsScreen;
