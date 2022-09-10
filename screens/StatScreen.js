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
  Animated,
  PanResponder,
  TextInput,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {store} from '../Store';

const StatScreen = () => {
  const [userProfile, setUserProfile] = useState({});
  const [userProfileValue, setUserProfileValue] = useState({});
  const pan = useRef(new Animated.ValueXY()).current;

  let rotate = pan.x.interpolate({
    inputRange: [-20 / 2, 0, 20 / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp',
  });

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
      },
      onPanResponderMove: Animated.event([null, {dx: pan.x, dy: pan.y}]),
      onPanResponderRelease: (evt, gestureState) => {
        //pan.flattenOffset();
        if (gestureState.dx > 20) {
          Animated.spring(pan, {
            toValue: {x: 120 + 100, y: gestureState.dy},
          }).start(() => {
            console.log('delete right');
          });
        } else if (gestureState.dx < -20) {
          Animated.spring(this.position, {
            toValue: {x: -120 - 100, y: gestureState.dy},
          }).start(() => {
            console.log('delete left');
          });
        }
      },
    }),
  ).current;

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
        <Text className="mt-2 text-center text-yellow-50 text-xl">
          {userProfileValue?.fname}
        </Text>
        <Text className="mt-2 text-center text-yellow-50 text-xl">
          {userProfileValue?.lname}
        </Text>
        <Text style={styles.titleText}>Drag this box!</Text>
        <Text style={styles.titleText}>Drag this box!</Text>
        <Animated.View
          style={{
            // transform: [{translateX: pan.x}, {translateY: pan.y}],
            transform: [{rotate: rotate}, ...pan.getTranslateTransform()],
          }}
          {...panResponder.panHandlers}>
          <View style={styles.box} />
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: 'bold',
  },
  box: {
    height: 150,
    width: 150,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
});
export default StatScreen;
