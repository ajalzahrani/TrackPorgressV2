import {
  View,
  Text,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {CustomPicker} from 'src/components/shared';
import styles from './CardPickersStyle';

type CardRowCPType = {
  header: string;
  items: string[];
};
const CardRowCP: React.FC<CardRowCPType> = ({header, items}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(items[0]);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
        <CustomPicker
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          items={items}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardRowContainer}>
        <Text style={styles.cardRowText}>{t(header)}</Text>
        <Text style={styles.cardRowText}>{t(selectedItem)}</Text>
      </TouchableOpacity>
    </>
  );
};

export default CardRowCP;
