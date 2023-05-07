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
import React, {useState} from 'react';

import useUserPreferencesStore from 'src/store/useUserPreferencesStore';

// Components
import {colors, assets} from 'src/assets';
import {ScreenContainer} from 'src/components/shared';
import CardInformation from './components/CardInformation';
import {useTranslation} from 'react-i18next';
import type {userType} from 'src/types';
import CardInformationHC from './components/CardInformationHC';

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
              value: ['Male', 'Female'],
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
        {/* <CardInformationHC
          title="Body Measurements"
          rows={[
            {
              picker: 'picker',
              header: 'Height',
              value: generateNums(200),
            },
            {
              picker: 'picker',
              header: 'Weight',
              value: generateNums(250),
            },
            {
              picker: 'picker',
              header: 'BMI',
              value: generateNums(50),
            },
            {
              picker: 'picker',
              header: 'Muscle Mass',
              value: generateNums(70),
            },
            {
              picker: 'picker',
              header: 'Body Water',
              value: generateNums(100),
            },
            {
              picker: 'picker',
              header: 'Bone Mass',
              value: generateNums(100),
            },
            {
              picker: 'picker',
              header: 'Visceral Fat',
              value: generateNums(100),
            },
            {
              picker: 'picker',
              header: 'Bone Density',
              value: generateNums(100),
            },
            {
              picker: 'text',
              header: 'Bone Density',
              message: 'some message',
              value: 'some text',
            },
          ]}
        /> */}
        <CardInformationHC
          title="Language"
          rows={[
            {
              picker: 'picker',
              header: 'Language',
              value: languages.map(l => l.label),
            },
          ]}
        />
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
