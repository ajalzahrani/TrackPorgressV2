import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
  Button,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import useUserPreferencesStore from 'src/store/useUserPreferencesStore';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';

// Components
import {colors, assets} from 'src/assets';
import {ScreenContainer} from 'src/components/shared';
import CardInformation from './components/CardInformation';
import {useTranslation} from 'react-i18next';
import type {userType} from 'src/types';
import CardInformationHC from './components/CardInformationHC';
import useUnit from 'src/components/hooks/useUnit';

function generateNums(N: number) {
  const setOfNums = [...Array(N).keys()].map(i => (i + 1).toString());
  return setOfNums;
}

const SettingsScreen = () => {
  const userPreferences = useUserPreferencesStore(s => s.preferences);
  const setFirstname = useUserPreferencesStore(s => s.setFirstName);
  const setUsername = useUserPreferencesStore(s => s.setUsername);
  const setLastname = useUserPreferencesStore(s => s.setLastName);
  const setLocation = useUserPreferencesStore(s => s.setLocation);
  const setMobile = useUserPreferencesStore(s => s.setMobile);
  const setGender = useUserPreferencesStore(s => s.setGender);
  const setEmail = useUserPreferencesStore(s => s.setEmail);
  const setDOB = useUserPreferencesStore(s => s.setDOB);

  const bodyMeasurements = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setHight = useUserBodyMeasureStore(s => s.setHeight);
  const setWeight = useUserBodyMeasureStore(s => s.setWeight);
  // const setBmi = useUserBodyMeasureStore(s => s.setBmi);
  const setMuscleMass = useUserBodyMeasureStore(s => s.setMuscleMass);
  const setBodyWater = useUserBodyMeasureStore(s => s.setBodyWater);
  const setBoneDensity = useUserBodyMeasureStore(s => s.setBoneDensity);
  const setBoneMass = useUserBodyMeasureStore(s => s.setBoneMass);
  const setVisceralFat = useUserBodyMeasureStore(s => s.setVisceralFat);
  const setMetric = useUserBodyMeasureStore(s => s.setMetric);
  const [bmi, setBmi] = useState<string>('');

  useEffect(() => {
    const newBmi =
      Number(bodyMeasurements.weight) /
      Math.pow(Number(bodyMeasurements.height) / 100, 2);
    setBmi(newBmi.toFixed(2).toString());
  }, [bodyMeasurements.height, bodyMeasurements.weight]);

  const {t, i18n} = useTranslation();

  // array with all supported languages
  const languages = [
    {name: 'ar', label: 'Arabic'},
    {name: 'en', label: 'English'},
  ];

  type languageItemPropType = {
    name: string;
    label: string;
  };

  const LanguageItem = ({name, label}: languageItemPropType) => (
    <TouchableOpacity
      style={[styles.button]}
      onPress={() => {
        i18n.changeLanguage(name); //changes the app language
        // console.log(i18n.language);
      }}>
      <Text style={styles.textStyle}>
        {t(`common.actions.toggleTo${label}`)}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer>
      <View style={styles.profileTitleStyle}>
        <View style={styles.container}>
          <Image source={assets.AsianBueaty} style={styles.image} />
          <View style={{marginLeft: 16}}>
            <Text style={styles.userFullName}>John Wick</Text>
            <Text style={styles.username}>@johnWick</Text>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={{paddingBottom: 100}}>
        <CardInformationHC
          title="Account Information"
          rows={[
            {
              picker: 'picker',
              header: 'Gender',
              items: ['Male', 'Female'],
              value: userPreferences.gender ? userPreferences.gender : 'Male',
              setValue: setGender,
            },
            {
              picker: 'date',
              header: 'DOB',
              value: new Date(),
            },
            {
              picker: 'text',
              header: 'Email',
              value: '',
              message: 'Please enter your email',
            },
            {
              picker: 'text',
              header: 'Location',
              value: '',
              message: 'Please enter your location',
            },
          ]}
        />
        <CardInformationHC
          title="Body Measurements"
          rows={[
            {
              picker: 'picker',
              header: 'Height',
              items: generateNums(200),
              value: bodyMeasurements.height,
              setValue: setHight,
            },
            {
              picker: 'picker',
              header: 'Weight',
              items: generateNums(250),
              value: bodyMeasurements.weight,
              setValue: setWeight,
            },
            {
              picker: 'picker',
              header: 'BMI',
              items: generateNums(50),
              value: bmi,
              // setValue: setBmi,
            },
            {
              picker: 'picker',
              header: 'Muscle Mass',
              items: generateNums(70),
              value: bodyMeasurements.muscleMass,
              setValue: setMuscleMass,
            },
            {
              picker: 'picker',
              header: 'Body Water',
              items: generateNums(100),
              value: bodyMeasurements.bodyWater,
              setValue: setBodyWater,
            },
            {
              picker: 'picker',
              header: 'Unit of Measurement',
              items: ['kg', 'lbs'],
              value: bodyMeasurements.metric,
              setValue: setMetric,
            },
            // {
            //   picker: 'picker',
            //   header: 'Bone Mass',
            //   value: generateNums(100),
            // },
            // {
            //   picker: 'picker',
            //   header: 'Visceral Fat',
            //   value: generateNums(100),
            // },
            // {
            //   picker: 'picker',
            //   header: 'Bone Density',
            //   value: generateNums(100),
            // },
            // {
            //   picker: 'text',
            //   header: 'Bone Density',
            //   message: 'some message',
            //   value: 'some text',
            // },
          ]}
        />
        {/* <CardInformationHC
          title="Language"
          rows={[
            {
              picker: 'picker',
              header: 'Language',
              value: languages.map(l => l.label),
            },
          ]}
        /> */}
        <View style={styles.centeredView}>
          {languages.map(lang => (
            <LanguageItem {...lang} key={lang.name} />
          ))}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
  },
  button: {
    backgroundColor: colors.offwhite,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
  },
  textStyle: {color: 'white'},
  buttonOpen: {},
  profileTitleStyle: {
    marginTop: 10,
    marginLeft: 12,
  },
  cardInformationStyle: {},

  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userFullName: {
    color: colors.white,
    fontSize: 24,
  },
  username: {
    color: colors.white,
    fontStyle: 'normal',
    fontSize: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: '#D9D9D9',
  },
});
