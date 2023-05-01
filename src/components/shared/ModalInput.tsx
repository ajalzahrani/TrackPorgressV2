import {StyleSheet, ViewStyle, TextInput} from 'react-native';
import React from 'react';
import CustomModal from './CustomModal';

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
  const [text, setText] = React.useState(textValue);
  return (
    <>
      <CustomModal
        message={message}
        visible={visible}
        onClose={onClose}
        buttons={[
          {
            text: 'OK',
            onPress: () => {
              onClose();
              setTextValue(text.toString());
            },
          },
          {
            text: 'Cancel',
            onPress: () => {
              onClose();
              // setTextValue('');
            },
          },
        ]}>
        <TextInput
          style={styles.textInput}
          onChangeText={setText}
          value={text}
        />
      </CustomModal>
    </>
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
