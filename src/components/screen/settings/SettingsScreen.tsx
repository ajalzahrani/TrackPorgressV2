import {
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import React from 'react';

// Components
import {colors, assets} from 'src/assets';
import {ScreenContainer} from 'src/components/shared';

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
      <View style={styles.cardInformationStyle}>
        {/* <CardInformation /> */}
      </View>
      <View style={styles.centeredView}>
        {languages.map(lang => (
          <LanguageItem {...lang} key={lang.name} />
        ))}
      </View>
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
  cardInformationStyle: {
    paddingHorizontal: 5,
    marginTop: 10,
  },

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
