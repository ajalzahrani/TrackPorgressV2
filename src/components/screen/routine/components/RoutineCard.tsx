import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useState} from 'react';

import {colors, assets} from './constants';

import {useNavigation} from '@react-navigation/native';

// Store
import useStore from '../../../../store/store.bak/useStore';
import GeneralModal from '../../../shared/GeneralModal';

const RoutineCard = ({id, title}) => {
  const deleteRoutine = useStore(s => s.deleteRoutine);
  const routines = useStore(s => s.routines);
  const selectCurrentRoutine = useStore(s => s.selectCurrentRoutine);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const action = () => {
    deleteRoutine(id);
  };

  return (
    <>
      <GeneralModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        action={action}
        message="Are you sure to delet routine?"
      />

      <View style={style.cardContainer}>
        <Text style={style.workoutTitle}>{title}</Text>
        <View style={style.editContainerStyle} className="space-x-4">
          <TouchableOpacity
            onPress={() => {
              selectCurrentRoutine(id);
              navigation.navigate('RoutineFormScreen');
            }}>
            <Image source={assets.icn_plus} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setModalVisible(!modalVisible);
            }}>
            <Image source={assets.icn_remove} />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const style = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.secondaryow,
    borderRadius: 10,
  },
  workoutTitle: {
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
    color: colors.white,
  },
  editContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  touchableOpacityArrowStyle: {
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },
});

export default RoutineCard;
