import {View, Text} from 'react-native';
import React from 'react';
import DateTimePickerModal from '@react-native-community/datetimepicker';

const DatePickerModal = props => {
  return (
    <DateTimePickerModal
      date={props.selectedDate}
      isVisible={props.datePickerVisible}
      mode="date"
      onConfirm={props.handleConfirm}
      onCancel={props.hideDatePicker}
    />
  );
};

export default DatePickerModal;
