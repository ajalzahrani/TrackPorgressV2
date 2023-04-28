import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Button,
  Keyboard,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {colors} from 'src/assets';
import {CustomPicker} from 'src/components/shared';
import Divider from 'src/components/shared/Divider';
import DatePicker from 'react-native-date-picker';
import {ModalInput} from 'src/components/shared';

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

type CardRowDateType = {
  header: string;
  dob: Date;
};
const CardRowDate: React.FC<CardRowDateType> = ({header, dob}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [date, setDate] = React.useState<Date>(dob);
  return (
    <>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <DatePicker
          modal
          open={modalVisible}
          date={date}
          onConfirm={date => {
            setModalVisible(false);
            setDate(date);
          }}
          onCancel={() => {
            setModalVisible(false);
          }}
        />
      </TouchableWithoutFeedback>
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardRowContainer}>
        <Text style={styles.cardRowText}>{t(header)}</Text>
        <Text style={styles.cardRowText}>{date.toLocaleDateString()}</Text>
      </TouchableOpacity>
    </>
  );
};

type CardRowTextType = {
  header: string;
  text: string | number;
};
const CardRowText: React.FC<CardRowTextType> = ({header, text}) => {
  const {t} = useTranslation();
  const [modalVisible, setModalVisible] = React.useState(false);
  const [textValue, setTextValue] = React.useState(text);
  return (
    <>
      <ModalInput
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        textValue={textValue}
        setTextValue={setTextValue}
        message="E-mail address"
      />
      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        style={styles.cardRowContainer}>
        <Text style={styles.cardRowText}>{t(header)}</Text>
        <Text style={styles.cardRowText}>{textValue}</Text>
      </TouchableOpacity>
    </>
  );
};

type CardInformationHCType = {
  title: string;
};
const CardInformationHC = ({title}: CardInformationHCType) => {
  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.cardContainer}>
        <CardRowCP header="Gender" items={['Male', 'Female']} />
        <Divider />
        <CardRowCP header="Empty" items={['1', '2', '3', '4']} />
        <Divider />
        <CardRowDate header="DOB" dob={new Date()} />
        <Divider />
        <CardRowText header="email" text="" />
      </View>
    </View>
  );
};

export default CardInformationHC;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 20,
  },
  cardContainer: {
    paddingHorizontal: 12,
    paddingVertical: 20,
    backgroundColor: colors.offwhite,
    borderRadius: 20,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: colors.white,
  },
  cardRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    flexGrow: 0,
  },
  cardRowText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: '500',
  },
  containerr: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
