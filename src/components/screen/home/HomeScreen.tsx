import {Text, View, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';

// assets
import {colors, assets} from 'src/assets';

// Components
import QuickStart from './components/QuickStart';
import PressableButton from '../../shared/PressableButton';
import {Pressable} from 'src/components/shared';
import GeneralModal from '../../shared/GeneralModal';
import ScreenContainer from 'src/components/shared/ScreenContainer';

const HomeScreen = () => {
  const [modalView, setModalVisible] = useState(false);
  const {t} = useTranslation();

  return (
    <ScreenContainer>
      <GeneralModal
        modalVisible={modalView}
        setModalVisible={setModalVisible}
        action={() => console.log('action')}
        message="some message goes herelet make this text as big as we can"
      />
      <View style={styles.containerStyle}>
        <Text style={styles.homeTitle}>{t('home.title')}!</Text>
        <Image style={styles.image} source={assets.bgImage} />
        <View style={styles.descriptionContainerStyle}>
          {/* FIXME: adjust the font and the button as the design */}

          <Text style={styles.descriptionStyle}>{t('home.introduction')}</Text>

          <PressableButton
            title={t('home.btnQuickStart')}
            onPress={() => setModalVisible(!modalView)}
            style={{paddingHorizontal: 40, marginTop: 20}}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  homeTitle: {
    color: colors.white,
    fontSize: 36,
    fontWeight: '600',
  },
  containerStyle: {
    alignItems: 'center',
    padding: 16,
    marginTop: 120,
  },
  image: {
    marginTop: 12,
  },
  titleStyle: {
    marginTop: 1,
    fontWeight: '400',
    fontSize: '32',
    color: colors.white,
  },
  descriptionContainerStyle: {
    alignItems: 'center',
  },
  descriptionStyle: {
    color: colors.white,
    marginTop: 12,
    // fontFamily: 'normal',
    textAlign: 'center',
  },
});
