import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Alert,
  ViewStyle,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import React from 'react';
import CustomModal from './CustomModal';

type ModalInputProps = {
  message?: string;
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  style?: ViewStyle | ViewStyle[] | null;
  children?: React.ReactNode;
  textValue: string | number;
  setTextValue: (text: string) => void;
};

export default function ModalInput({
  message,
  modalVisible,
  setModalVisible,
  textValue,
  setTextValue,
}: ModalInputProps) {
  const [text, setText] = React.useState(textValue);
  return (
    <CustomModal
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      message={message}
      buttons={[
        {
          text: 'OK',
          onPress: () => {
            setModalVisible(false);
            setTextValue(text.toString());
          },
        },
        {
          text: 'Cancel',
          onPress: () => {
            setModalVisible(false);
            // setTextValue('');
          },
        },
      ]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerr}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <TextInput
            style={styles.textInput}
            onChangeText={setText}
            value={text}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </CustomModal>
  );
}

const styles = StyleSheet.create({
  containerr: {
    // flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
