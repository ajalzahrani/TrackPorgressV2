import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import LinearGradient from 'react-native-linear-gradient';

// Assets
import {colors, assets} from './constants';

const ExerciseActiveCard = ({exername, id, reps}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [time, setTime] = useState(10);

  const startTimer = useCallback(() => {}, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTime(prev => prev - 1);
    }, 1000);

    if (time === 1) {
      // setIsStarted(false);
      // setTime(10);
      clearTimeout(timer);
    }
  }, [time]);

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
          <Text className="text-white text-lg">{time} s</Text>
        </View>
        <View style={style.editContainerStyle} className="space-x-2">
          <TouchableOpacity
            onPress={() => {
              setIsPressed(!isPressed);
            }}>
            <Image source={assets.icn_add} />
          </TouchableOpacity>
        </View>
      </View>
      {isPressed && (
        <View style={style.controllerContainerStyle}>
          {/* <SETsController indicatorTitle={'Set'} /> */}
          <View style={style.controllerRowContainerStyle}>
            {/* inner set container */}
            <View style={style.controllerRowInnerStyle}>
              {/* Number indicator */}
              <View style={style.controllerNumberIndicator}>
                <Text style={{color: colors.white}}>120 kg</Text>
              </View>

              <Text style={style.controllerMiddleTextStyle}>Weight</Text>

              {/* plus - min buttons */}
              <View style={{flexDirection: 'row'}} className="space-x-10">
                <TouchableOpacity>
                  <Image source={assets.icn_min} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={assets.icn_add} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Dividor */}
          <View
            style={{
              borderWidth: 1,
              width: 300,
              borderColor: colors.secondaryow,
            }}
          />
          {/* <SETsController indicatorTitle={'Set'} /> */}
          <View style={style.controllerRowContainerStyle}>
            {/* inner set container */}
            <View style={style.controllerRowInnerStyle}>
              {/* Number indicator */}
              <View style={style.controllerNumberIndicator}>
                <Text style={{color: colors.white}}>{reps} r</Text>
              </View>

              <Text style={style.controllerMiddleTextStyle}>Reps</Text>

              {/* plus - min buttons */}
              <View style={{flexDirection: 'row'}} className="space-x-10">
                <TouchableOpacity>
                  <Image source={assets.icn_min} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={assets.icn_add} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Dividor */}
          <View
            style={{
              borderWidth: 1,
              width: 300,
              borderColor: colors.secondaryow,
            }}
          />
          {/* <SETsController indicatorTitle={'Set'} /> */}
          <View style={style.controllerRowContainerStyle}>
            {/* inner set container */}
            <View style={style.controllerRowInnerStyle}>
              {/* Number indicator */}
              <View style={style.controllerNumberIndicator}>
                <Text style={{color: colors.white}}>90 s</Text>
              </View>

              <Text style={style.controllerMiddleTextStyle}>TUT</Text>

              {/* plus - min buttons */}
              <View style={{flexDirection: 'row'}} className="space-x-10">
                <TouchableOpacity>
                  <Image source={assets.icn_min} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={assets.icn_add} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <TouchableOpacity
            className="mb-1"
            onPress={() => {
              // Register user entry data
              // setIsPressed(!isPressed);
              startTimer();
            }}>
            <LinearGradient
              className="py-3 px-10 rounded-full"
              colors={['#E10D60', '#FA3B89']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              locations={[0.75, 1]}
              // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
            >
              <Text className="text-base font-semibold text-white">
                Register
              </Text>
            </LinearGradient>
          </TouchableOpacity>
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
  controllerContainerStyle: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    // paddingVertical: 15,
    paddingBottom: 15,
    marginHorizontal: 20,
    backgroundColor: colors.secondaryow,
    marginBottom: 10,
    borderBottomEndRadius: 10,
    borderBottomStartRadius: 10,
  },

  controllerRowContainerStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controllerRowInnerStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  controllerNumberIndicator: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    backgroundColor: colors.secondaryow,
    width: 80,
    height: 29,
  },
  controllerMiddleTextStyle: {
    fontWeight: '400',
    fontSize: 16,
    color: colors.white,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 100,
    marginTop: 10,
    marginBottom: 10,
    marginHorizontal: 24.5,
  },
});

export default ExerciseActiveCard;
