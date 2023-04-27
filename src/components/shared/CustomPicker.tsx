import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, StyleSheet, Modal, Alert, Text, Pressable} from 'react-native';
import {colors} from 'src/assets/';
import {ScreenContainer} from 'src/components/shared';

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

const CustomPicker = ({modalVisible, setModalVisible}: Props) => {
  const [selectedLanguage, setSelectedLanguage] = useState();
  return (
    <View>
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
            <Picker
              style={{backgroundColor: colors.offwhite}}
              selectedValue={selectedLanguage}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedLanguage(itemValue)
              }>
              <Picker.Item label="English" value="English" color="black" />
              <Picker.Item label="Arabic" value="Arabic" color="black" />
            </Picker>
            <View style={{alignItems: 'center'}}>
              <Pressable
                style={[{marginTop: 10, backgroundColor: colors.blue}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>OK</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default CustomPicker;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end', // make the modal botton of the screen
    // alignItems: 'center',
    // marginHorizontal: 20,
  },
  modalView: {
    backgroundColor: colors.greeny,
    borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 35,
  },
});
