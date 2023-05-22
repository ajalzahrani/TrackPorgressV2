import React from 'react';
import {Picker} from '@react-native-picker/picker';
import {
  View,
  StyleSheet,
  Modal,
  Text,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
} from 'react-native';
import {colors} from 'src/assets/';
import ViewRow from './ViewRow';
import {} from 'react-native';

type picker = {
  items: string[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  picker: picker[];
};

const PickerList = ({visible, onClose, children, picker}: Props) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior="padding"
            style={{flex: 1, justifyContent: 'flex-end'}}
            keyboardVerticalOffset={50} // adjust the offset as needed
          >
            <TouchableWithoutFeedback onPress={() => null}>
              <View style={styles.modalView}>
                <ViewRow
                  style={{alignItems: 'center', justifyContent: 'center'}}>
                  {picker.map((pic, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          width: 150,
                          //   justifyContent: 'center',
                          //   alignItems: 'center',
                        }}>
                        <Text>seom</Text>
                        <Picker
                          selectedValue={pic.selectedItem}
                          onValueChange={(itemValue, itemIndex) =>
                            pic.setSelectedItem(itemValue)
                          }>
                          {pic.items.map((item, index) => {
                            return (
                              <Picker.Item
                                key={index}
                                label={item}
                                value={item}
                              />
                            );
                          })}
                        </Picker>
                      </View>
                    );
                  })}
                </ViewRow>
                {children}
              </View>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default PickerList;

const styles = StyleSheet.create({
  modalView: {
    backgroundColor: colors.secondary,
    // borderRadius: 20,
    borderTopLeftRadius: 20,
    borderTopEndRadius: 20,
    paddingHorizontal: 35,
    // paddingBottom: 35,
  },
});
