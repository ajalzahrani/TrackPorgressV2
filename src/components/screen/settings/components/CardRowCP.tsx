import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import styles from './CardPickersStyle';
import CustomPicker2 from 'src/components/shared/CustomPicker2';

type CardRowCPType = {
  header: string;
  items: string[];
};
const CardRowCP: React.FC<CardRowCPType> = ({header, items}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState(items[0]);

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <>
      <CustomPicker2
        visible={modalVisible}
        onClose={closeModal}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
        items={items}></CustomPicker2>
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
