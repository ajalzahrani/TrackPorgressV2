import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import {useGstore} from '../../../gstore';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import useStore from '../../../store/store.bak/useStore';

// assets
import {colors, assets} from 'src/assets';

// Components
import QuickStart from './components/QuickStart';
import PressableButton from '../../shared/PressableButton';
import GeneralModal from '../../shared/GeneralModal';
import ScreenContainer from 'src/components/shared/ScreenContainer';

const HomeScreen = () => {
  // const navigation = useNavigation();
  // const routines = useStore(state => state.routines);
  // const currentRoutine = useStore(state => state.currentRoutine);
  // const exercisesMaster = useStore(state => state.exercisesMaster);
  // const sessions = useGstore(state => state.sessions);
  const [modalView, setModalVisible] = useState(false);
  const {t} = useTranslation();

  return (
    <ScreenContainer style={styles.safeViewStyle} children={''}>
      <GeneralModal
        modalVisible={modalView}
        setModalVisible={setModalVisible}
        action={() => console.log('action')}
        message="some message goes herelet make this text as big as we can"
      />
      <View style={styles.containerStyle}>
        <Text>{t('home.title')}!</Text>
        <Image style={styles.image} source={assets.bgImage} />
        {/* <QuickStart /> */}
        <View style={styles.descriptionContainerStyle}>
          {/* FIXME: adjust the font and the button as the design */}

          <Text style={styles.descriptionStyle}>{t('home.introduction')}</Text>

          <PressableButton
            title={t('home.btnQuickStart')}
            onPress={() => setModalVisible(!modalView)}
            style={{paddingHorizontal: 40}}
          />
        </View>
      </View>
    </ScreenContainer>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  containerStyle: {
    alignItems: 'center',
    padding: 16,
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
    fontFamily: 'normal',
    textAlign: 'center',
  },
});
