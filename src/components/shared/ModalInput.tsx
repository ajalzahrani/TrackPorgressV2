import {StyleSheet, ViewStyle, TextInput} from 'react-native';
import React from 'react';
import CustomModal2 from './CustomModal2';

type ModalInputProps = {
  message: string;
  visible: boolean;
  onClose: () => void;
  style?: ViewStyle | ViewStyle[] | null;
  children?: React.ReactNode;
  textValue: string;
  setTextValue: (text: string) => void;
};

export default function ModalInput({
  message,
  visible,
  onClose,
  textValue,
  setTextValue,
}: ModalInputProps) {
  return (
    <>
      <CustomModal2
        message={message}
        visible={visible}
        onClose={onClose}
        buttons={[
          {
            text: 'OK',
            onPress: () => {
              onClose();
              setTextValue(textValue);
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              onClose();
              setTextValue('');
            },
          },
        ]}>
        <TextInput
          style={styles.textInput}
          onChangeText={setTextValue}
          value={textValue}
          autoCapitalize="none"
        />
      </CustomModal2>
    </>
  );
}

const styles = StyleSheet.create({
  textInput: {
    width: '100%',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
