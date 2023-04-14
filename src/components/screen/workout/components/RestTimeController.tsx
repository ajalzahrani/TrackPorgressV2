import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import {TimePicker, ValueMap} from 'react-native-simple-time-picker';

import {timing} from 'src/components/shared';

// Assets
import {colors, assets} from 'src/assets';

// Store
import useStore from '../../../../store/store.bak/useStore';
import useExerciseStore from 'src/store/useExerciseMaster';
import useRoutineStore from 'src/store/useRoutineStore';

type RestTimeControllerProp = {
  indicatorTitle: string;
  controllerTypeId: number;
};
const RestTimeController: React.FC<RestTimeControllerProp> = ({
  indicatorTitle,
  controllerTypeId,
}) => {
  const routines = useRoutineStore(s => s.routines);
  const addRestTime = useStore(s => s.addRestTime);
  const currentWorkout = useStore(s => s.currentWorkout);
  const resttime = currentWorkout.resttime;

  const [number, setNumber] = useState(() => {
    if (controllerTypeId === 0) return resttime[0];
    else return resttime[1];
  });

  const [value, setValue] = useState({
    hours: 1,
    minutes: 0,
    seconds: 0,
  });

  const [isPressed, setIsPressed] = useState(false);

  const handleChange = (newValue: ValueMap) => {
    setValue(newValue);
  };

  useEffect(() => {
    setNumber(timing.convertTimeToSeconds(value.minutes, value.seconds));
  }, [value]);

  useEffect(() => {
    addRestTime(controllerTypeId, number);
  }, [number]);

  useEffect(() => {
    setValue(timing.convertToTimeObj(number));
  }, []);

  return (
    <View style={style.containerStyle}>
      <View style={style.innerContainerStyle}>
        <TouchableOpacity onPress={() => setIsPressed(!isPressed)}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Text style={style.middleTextStyle}>{indicatorTitle}</Text>
            {/* <ChevronDownIcon /> */}
            <Image
              source={isPressed ? assets.icn_min : assets.icn_add}
              style={{height: 20, width: 20}}
            />
          </View>
        </TouchableOpacity>
        {isPressed && (
          <TimePicker
            value={value}
            onChange={handleChange}
            textColor={colors.white}
            pickerShows={['minutes', 'seconds']}
            secondsUnit="Sec"
            minutesUnit="Min"
            secondsInterval={5}
          />
        )}
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
    flexDirection: 'column',
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
    marginRight: 10,
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
});

export default RestTimeController;
