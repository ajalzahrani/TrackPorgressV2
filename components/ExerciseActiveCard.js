import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';

// Assets
import {colors, assets} from './constants';

// compo
import TimerLabel from './TimerLabel';

const ExerciseActiveCard = ({exername, id, reps, resttime, resttimeId}) => {
  const [isPressed, setIsPressed] = useState(false);

  const [seconds, setSeconds] = useState(() => {
    if (resttimeId === 0) return resttime[0];
    else return resttime[1];
  });
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(0);
    setIsActive(false);
  }

  return (
    <>
      <View
        style={[
          style.cardContainer,
          {borderBottomEndRadius: isPressed ? 0 : 10},
          {borderBottomStartRadius: isPressed ? 0 : 10},
          {marginBottom: isPressed ? 0 : 7},
        ]}>
        <View className="flex-col space-y-2">
          <Text style={style.workoutTitle}>{exername}</Text>
          <TimerLabel
            seconds={seconds}
            setSeconds={setSeconds}
            isActive={isActive}
            setIsActive={setIsActive}
            reset={reset}
            toggle={toggle}
          />
        </View>
        <View style={style.editContainerStyle} className="space-x-2">
          <TouchableOpacity
            onPress={() => {
              setIsPressed(!isPressed);
            }}>
            <Image source={isPressed ? assets.icn_min : assets.icn_add} />
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
              toggle();
            }}>
            <LinearGradient
              className="py-3 px-10 rounded-full"
              colors={['#E10D60', '#FA3B89']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 1}}
              locations={[0.75, 1]}>
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
    // marginVertical: 5,
    marginBottom: 7,
    marginTop: 7,
    marginHorizontal: 20,
    // marginTop: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
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
    marginBottom: 7,
    marginHorizontal: 20,
    paddingBottom: 15,
    paddingHorizontal: 20,
    backgroundColor: colors.secondaryow,
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