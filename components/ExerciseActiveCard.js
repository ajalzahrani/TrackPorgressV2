import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';

// Assets
import {colors, assets} from './constants';

const ExerciseActiveCard = ({exername, id}) => {
  const [isPressed, setIsPressed] = useState(false);

  return (
    <>
      <View
        style={[
          style.cardContainer,
          {borderBottomEndRadius: isPressed ? 0 : 10},
          {borderBottomStartRadius: isPressed ? 0 : 10},
        ]}>
        <View className="flex-col space-y-2">
          <Text style={style.workoutTitle}>
            ID: {id} {exername}
          </Text>
          <Text className="text-white text-lg">1:30 s</Text>
        </View>
        <View style={style.editContainerStyle} className="space-x-2">
          <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
            <Image source={assets.icn_add} />
          </TouchableOpacity>
        </View>
      </View>
      {isPressed && (
        <View style={style.controllerStyle}>
          <View className="flex-row items-center space-x-2 pb-3">
            <TouchableOpacity>
              <Text className="text-white">Add</Text>
            </TouchableOpacity>

            <Text className="text-white">554</Text>

            <TouchableOpacity>
              {/* <PlusCircleIcon color="#00CCBB" size={40} /> */}
              <Text className="text-white">Min</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
};

const style = StyleSheet.create({
  // Exercise card
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    // marginVertical: 10,
    backgroundColor: colors.secondaryow,
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
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
  controllerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginHorizontal: 20,
    backgroundColor: colors.secondaryow,
    marginBottom: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },
});

export default ExerciseActiveCard;
