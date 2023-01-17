import {StyleSheet, Text, View, Modal, Pressable} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Image} from 'react-native-svg';

const CardExerciseDetails = ({exercise}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <View className="px-5 py-4 placeholder-sky-300 rounded-lg">
        <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
          <Text className="text-white text-sm font-medium">
            {t('exercise.bodyPart')}
          </Text>
          <Text className="text-white text-base font-normal">
            {exercise.bodyPart}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
          <Text className="text-white text-sm font-medium">
            {t('exercise.equipment')}
          </Text>
          <Text className="text-white text-base font-normal">
            {exercise.equipment}
          </Text>
        </View>

        <View className="flex flex-row justify-between items-center py-3 flex-grow-0">
          <Text className="text-white text-sm font-medium">
            {t('exercise.target')}
          </Text>
          <Text className="text-white text-base font-normal">
            {exercise.target}
          </Text>
        </View>

        <Text>{exercise.gifUrl}</Text>

        <Image
          style={{width: '100%', height: '80%'}}
          source={{
            uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220221170632/ezgifcomgifmaker1.gif',
          }}
        />

        <Image
          style={{
            width: 51,
            height: 51,
            resizeMode: 'contain',
          }}
          source={{
            uri: exercise.gifUrl,
          }}
        />
      </View>
    </>
  );
};

export default CardExerciseDetails;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
