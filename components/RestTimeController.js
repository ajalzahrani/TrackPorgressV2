import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from '../components/constants';

const RestTimeController = ({
  indicatorTitle,
  handleAddRestTime,
  resttime,
  id,
}) => {
  const [number, setNumber] = useState(() => {
    if (id === 0) return resttime[0];
    else return resttime[1];
  });

  const addNumber = () => {
    setNumber(number + 1);
  };

  const minNumber = () => {
    if (number === 0) {
      setNumber(0);
    } else {
      setNumber(number - 1);
    }
  };

  useEffect(() => {
    handleAddRestTime(id, number);
  }, [number]);

  return (
    <View style={style.containerStyle}>
      {/* inner set container */}
      <View style={style.innerContainerStyle}>
        {/* Number indicator */}
        <View style={style.numberIndicator}>
          <Text style={{color: colors.white}}>{number}</Text>
        </View>

        <Text style={style.middleTextStyle}>{indicatorTitle}</Text>

        {/* plus - min buttons */}
        <View style={{flexDirection: 'row'}} className="space-x-10">
          <TouchableOpacity
            onPress={() => {
              minNumber();
            }}>
            <Image source={assets.icn_min} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => addNumber()}>
            <Image source={assets.icn_add} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  containerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: colors.secondaryow,
    borderRadius: 20,
  },
  innerContainerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  numberIndicator: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.secondaryow,
    width: 80,
    height: 29,
  },
  middleTextStyle: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
});

export default RestTimeController;
