import React, {useState} from 'react';
import {Picker} from '@react-native-picker/picker';
import {View, StyleSheet, Modal, Alert, Text, Pressable} from 'react-native';
import {colors} from 'src/assets/';
import {ScreenContainer} from 'src/components/shared';
import Divider from 'src/components/shared/Divider';

type Props = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

const CustomPicker = ({
  modalVisible,
  setModalVisible,
  items,
  selectedItem,
  setSelectedItem,
}: Props) => {
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
            <View style={{alignItems: 'flex-end'}}>
              <Pressable
                style={[{marginTop: 10, backgroundColor: colors.blue}]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}>
                <Text>OK</Text>
              </Pressable>
            </View>
            <Picker
              // style={{backgroundColor: colors.offwhite}}
              selectedValue={selectedItem}
              onValueChange={(itemValue, itemIndex) =>
                setSelectedItem(itemValue)
              }>
              {items.map((item, index) => {
                return <Picker.Item key={index} label={item} value={item} />;
              })}
            </Picker>
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
    backgroundColor: colors.secondary,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 35,
    // paddingBottom: 35,
  },
});
