import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {colors} from 'src/assets';

import ProfileTitle from './components/ProfileTitle';
import CardInformation from './components/CardInformation';

import {useTranslation} from 'react-i18next';

const SettingsScreen = () => {
  const {t, i18n} = useTranslation();

  // array with all supported languages
  const languages = [
    {name: 'ar', label: 'Arabic'},
    {name: 'en', label: 'English'},
  ];

  type propType = {
    name: string;
    label: string;
  };

  const LanguageItem = ({name, label}: propType) => (
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
    <SafeAreaView style={styles.safeViewStyle}>
      <View style={styles.profileTitleStyle}>
        <ProfileTitle />
      </View>
      <View style={styles.cardInformationStyle}>
        <CardInformation />
      </View>
      <View style={styles.centeredView}>
        {languages.map(lang => (
          <LanguageItem {...lang} key={lang.name} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
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
  cardInformationStyle: {
    paddingHorizontal: 5,
    marginTop: 10,
  },
});