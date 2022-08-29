import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AddExerciseModle = () => {
  return (
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
  );
};

export default AddExerciseModle;

const styles = StyleSheet.create({});
