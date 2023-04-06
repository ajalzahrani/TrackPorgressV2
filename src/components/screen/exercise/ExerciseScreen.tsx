import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Pressable,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, assets} from '../components/constants';

// components
import ExerciseSelectRow from '../components/ExerciseSelectRow';

// Store
import useStore from '../store/useStore';

import PressableButton from '../components/PressableButton';

const ExerciseScreen = () => {
  // FIXME: presis exercise selection when search
  // FIXME: auto select new added exercise
  const exercisesMaster = useStore(s => s.exercisesMaster);
  const saveNewExerciseMaster = useStore(s => s.saveNewExerciseMaster);
  const [search, setSearch] = useState(''); //
  const [searchResult, setSearchResult] = useState(ExerciseApi);
  const [notFound, setNotFound] = useState(false); // handle if no exercise found in search
  const [modalVisible, setModalVisible] = useState(false);

  // search the list of exercises data and eanble the user to add not found exercies.
  const handleSearch = searchText => {
    setSearch(searchText);
    const filterdExercies = ExerciseApi.filter((exer, index) => {
      // console.log(exer.title.match(searchText));
      return exer.name.match(searchText.toLowerCase());
    });
    if (searchText.length === 0) {
      setSearchResult(ExerciseApi);
      setNotFound(false);
    } else if (filterdExercies.length === 0) {
      setNotFound(true);
    } else {
      setSearchResult(filterdExercies);
      setNotFound(false);
    }
  };

  const bodyPartSearch = iconDesc => {
    const filterdExercies = ExerciseApi.filter((exer, index) => {
      return exer.bodyPart.match(iconDesc.toLowerCase());
    });
    handleSearchResult(iconDesc, filterdExercies);
  };

  const handleSearchResult = (searchTerm, filterdExercies) => {
    if (searchTerm.length === 0) {
      setSearchResult(ExerciseApi);
      setNotFound(false);
    } else if (filterdExercies.length === 0) {
      setNotFound(true);
    } else {
      setSearchResult(filterdExercies);
      setNotFound(false);
    }
  };

  const renderItem = ({item}) => {
    return (
      <View style={styles.preListContainerStyle}>
        <ExerciseSelectRow key={item.id} item={item} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeViewStyle}>
      <Modal
        animationType="pageSheet"
        presentationStyle="fullScreen"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Which pride</Text>
          </Pressable>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageSelf}
              source={{
                // uri: 'https://reactnative.dev/img/tiny_logo.png',
                // uri: 'https://media.geeksforgeeks.org/wp-content/uploads/20220221170632/ezgifcomgifmaker1.gif',
                // uri: 'http://d205bpvrqc9yn1.cloudfront.net/1512.gif',
                uri: 'https://media0.giphy.com/media/GtzXOGVW3ks8g/giphy.gif?cid=ecf05e476hj62jvozlrixbpyf8kjxtap5an3m7t4p02bm8bn&rid=giphy.gif&ct=g',
              }}
              // source={require('../asset/0001.gif')}
              resizeMode="contain"
            />
            {/* <Image
              style={styles.tinyLogo}
              source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}
            /> */}
          </View>
        </View>
      </Modal>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        {/* TextInput component */}
        <TextInput
          placeholder="Exercise name"
          placeholderTextColor={colors.offwhite}
          onChangeText={handleSearch}
          value={search}
          style={styles.textInputStyle}
        />
        {notFound && (
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
              // opacity: notFound ? 1 : 0,
            }}>
            <Text style={{color: 'white', marginRight: 10}}>
              Not found, Do you want to add
            </Text>
            {/* <Button title="Add" /> */}
            {/* FIXME: after save delete search and show the list again */}
            <TouchableOpacity
              onPress={() => {
                setNotFound(false);
                setSearch('');
                saveNewExerciseMaster(search);
                setSearchResult(exercisesMaster);
              }}>
              <Image source={assets.icn_add} />
            </TouchableOpacity>
          </View>
        )}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginVertical: 20,
          }}>
          <TouchableOpacity onPress={() => bodyPartSearch('waist')}>
            <Image source={assets.icn_abs} style={styles.searchIcons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => bodyPartSearch('arm')}>
            <Image source={assets.icn_arm} style={styles.searchIcons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => bodyPartSearch('legs')}>
            <Image source={assets.icn_leg} style={styles.searchIcons} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => bodyPartSearch('chest')}>
            <Image source={assets.icn_chest} style={styles.searchIcons} />
          </TouchableOpacity>
        </View>
        {/* <PressableButton
          title={'try an image'}
          onPress={() => setModalVisible(!modalVisible)}
        /> */}
        <FlatList
          contentContainerStyle={{paddingBottom: 72}}
          data={searchResult}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {backgroundColor: 'blue'},
  imageSelf: {width: '100%', height: '100%', resizeMode: 'contain'},
  safeViewStyle: {
    backgroundColor: colors.primary,
    flex: 1,
  },
  searchIcons: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  ExerciseRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginVertical: 10,
  },
  preListContainerStyle: {
    // flex: 1,
    marginTop: 24,
    backgroundColor: colors.secondaryow,
    justifyContent: 'center',
    borderRadius: 20,
    padding: 10,
  },
  touchableOpacityStartStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 55,
    paddingVertical: 10,
    gap: 10,
    borderRadius: 100,
    marginTop: 30,
    marginHorizontal: 80,
  },
  exerciseTitleStyle: {
    color: colors.white,
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },
  textInputStyle: {
    backgroundColor: colors.offwhite,
    paddingVertical: 12,
    paddingHorizontal: 20,
    color: colors.white,
    fontSize: 16,
    fontWeight: '400',
    borderRadius: 100,
    marginHorizontal: 30,
    marginTop: 47,
  },
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default ExerciseScreen;