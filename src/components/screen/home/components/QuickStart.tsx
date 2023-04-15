import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

import {useTranslation} from 'react-i18next';
import useRoutineStore from 'src/store/useRoutineStore';

const QuickStart = () => {
  const routines = useRoutineStore(state => state.routines);
  const {t} = useTranslation();

  return (
    <View className="items-center">
      {/* FIXME: adjust the font and the button as the design */}

      <Text className="text-white mt-12 font-normal text-sm text-center">
        {t('home.introduction')}
      </Text>

      <TouchableOpacity
        onPress={() => {
          // const exercises = JSON.parse(store.getString('exercises'));
          // const workouts = JSON.parse(store.getString('workouts'));
          // console.log(JSON.stringify(sessions));
          console.log(JSON.stringify(routines));
        }}>
        <LinearGradient
          className="py-3 px-20 rounded-full mt-10"
          colors={['#E10D60', '#FA3B89']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0.75, 1]}
          // colors={['rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2)']}
        >
          <Text className="text-base font-semibold text-white">
            {t('home.btnQuickStart')}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default QuickStart;
