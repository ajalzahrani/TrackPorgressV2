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

// Components
import {colors, assets} from 'src/assets';
import {ScreenContainer, CustomPicker} from 'src/components/shared';
import CardInformation from './components/CardInformation';
import {useTranslation} from 'react-i18next';
import type {userType} from 'src/types';
import CardInformationHC from './components/CardInformationHC';

const SettingsScreen = () => {
  const [accountInfo, setAccountInfo] = React.useState({
    gender: '',
    dob: '',
    location: '',
    email: '',
  });

  const [bodyMeaurement, setBodyMeaurement] = React.useState({
    height: 0,
    weight: 0,
    bmi: 0,
    muscleMass: 0,
    bodyWater: 0,
    boneMass: 0,
    visceralFat: 0,
    boneDensity: 0,
  });

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
        <CardInformationHC title="Parameters" />
        <CardInformation
          title="Account Information"
          rows={Object.keys(accountInfo).map(key => ({
            header: key,
            value: accountInfo[key as keyof typeof accountInfo],
          }))}
        />
        <CardInformation
          title="Measurements"
          rows={Object.keys(bodyMeaurement).map(key => ({
            header: key,
            value: bodyMeaurement[key as keyof typeof bodyMeaurement],
          }))}
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
