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
  Alert,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {store} from '../Store';

const StatScreen = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userProfileValue, setUserProfileValue] = useState({});

  const handleSave = () => {
    const fname = store.getString('fname');
    const lname = store.getString('lname');
    const fullname = {fname: fname, lname: lname};
    setUserProfile(fullname);
  };

  const handleRead = () => {
    const fname = store.getString('fname');
    const lname = store.getString('lname');
    const fullname = {fname: fname, lname: lname};
    setUserProfileValue(fullname);
  };

  const handleDelete = () => {
    store.delete('fname');
    store.delete('lname');
    setUserProfile({});
    setUserProfileValue({});
  };

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View className="p-5">
        <Text className="text-center bg-red-300 text-lg p-5">
          Statistic Screen
        </Text>
        <TextInput
          className="bg-gray-300 p-5 mt-2"
          placeholder="Firstname"
          placeholderTextColor="black"
          onChangeText={data => {
            store.set('fname', data);
          }}
        />
        <TextInput
          className="bg-gray-300 p-5 mt-2"
          placeholder="Lastname"
          placeholderTextColor="black"
          clearButtonMode="always"
          value={userProfile}
          onChangeText={data => {
            store.set('lname', data);
          }}
        />
        <TouchableOpacity
          className="bg-blue-500 w-max mt-5 p-5"
          onPress={() => {
            handleSave();
          }}>
          <Text className="text-white text-center text-lg">Save Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 w-max mt-2 p-5"
          onPress={() => {
            handleRead();
          }}>
          <Text className="text-white text-center text-lg">Get Data</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-blue-500 w-max mt-2 p-5"
          onPress={() => {
            handleDelete();
          }}>
          <Text className="text-white text-center text-lg">Clear Data</Text>
        </TouchableOpacity>
        <Text className="mt-2 text-center text-xl">
          {userProfileValue?.fname}
        </Text>
        <Text className="mt-2 text-center text-xl">
          {userProfileValue?.lname}
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default StatScreen;
