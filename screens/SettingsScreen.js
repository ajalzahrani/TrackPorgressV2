import {View, TouchableOpacity, Text, SafeAreaView, Image} from 'react-native';
import React, {useState} from 'react';

import ProfileTitle from '../components/ProfileTitle';
import CardInformation from '../components/CardInformation';

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
    <SafeAreaView className="bg-[#112044] flex-1">
      <View className="mt-10 ml-12">
        <ProfileTitle />
      </View>
      <View className="px-5 mt-10">
        <CardInformation />
      </View>
      <View className="px-5 mt-2">
        <CardInformation />
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
