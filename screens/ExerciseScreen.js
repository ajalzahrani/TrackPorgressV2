import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Button,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

// Database
import {db, Exercise_Read, getCategories} from '../components/database';

// components
import Divider from '../components/Divider';
import ExerciseSelectRow from '../components/ExerciseSelectRow';
import {useNavigation} from '@react-navigation/native';
import AddExerciseModle from '../components/AddExerciseModle';

const ExerciseScreen = () => {
  const navigation = useNavigation();
  const [exData, setEXData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState();
  const [notFound, setNotFound] = useState(false);

  const handleSearch = searchText => {
    const filterdExercies = exData.filter((exer, index) => {
      // console.log(exer.title.match(searchText));
      return exer.title.match(searchText);
    });
    if (searchText === '') {
      setSearchResult([]);
    } else {
      setSearchResult(filterdExercies);
    }
  };

  const Exercise_Create = async () => {
    (await db).transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ExerciesMaster 
        (id integer primary key autoincrement, name varchar(255))`,
        [],
        (SQLTransaction, SQLResultSet) => {
          console.log('Table Exercies was created successfully.');
        },
        error => {
          console.log('Error on creating Exercies table: ', error.message);
        },
      );
    });
  };

  const Exercise_Insert = async () => {
    (await db).transaction(txn => {
      txn.executeSql(
        `insert into ExerciesMaster (name) values (?)`,
        [search],
        (SQLTransaction, SQLResultSet) => {
          console.log(`exer added successfully.`);
          setSearch('');
        },
        error => {
          console.log('Error on adding category: ', error.message);
        },
      );
    });
  };

  const Exercise_Read = () => {
    let query = '';

    if (search.length > 0) {
      query =
        "select id, name from ExerciesMaster where name LIKE '%" +
        search +
        "%' ";
    } else {
      query = `select id, name from ExerciesMaster`;
    }

    return db.transaction(tx => {
      tx.executeSql(
        query,
        [],
        (SQLTransaction, SQLResultSet) => {
          console.log('Exercises retrieved successfully');

          let len = SQLResultSet.rows.length;
          // console.log('lenth = , ', len);
          if (len > 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let exeRow = SQLResultSet.rows.item(i);
              result.push({id: exeRow.exerciseId, name: exeRow.name});
            }
            setEXData(result);
            setNotFound(false);
          } else {
            console.log('No Result');
            setNotFound(true);
          }
        },
        error => {
          console.log('Error on reading exercises', error.message);
        },
      );
    });
  };

  useEffect(() => {
    Exercise_Create();
    Exercise_Read();
  }, [search]);
  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <View style={{paddingHorizontal: 16, flex: 1}}>
        {/* TextInput component */}
        <TextInput
          placeholder="Exercise name"
          placeholderTextColor={colors.offwhite}
          onChangeText={setSearch}
          value={search}
          style={{
            backgroundColor: colors.offwhite,
            paddingVertical: 12,
            paddingHorizontal: 20,
            color: colors.white,
            fontSize: 16,
            fontWeight: '400',
            borderRadius: 100,
            marginHorizontal: 30,
            marginTop: 47,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            opacity: notFound ? 1 : 0,
          }}>
          <Text style={{color: 'white', marginRight: 10}}>
            Not found, Do you want to add
          </Text>
          {/* <Button title="Add" /> */}
          <TouchableOpacity onPress={() => Exercise_Insert()}>
            <Image source={assets.icn_add} />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={{paddingBottom: 72, marginTop: 20}}>
          {/* Exercise List */}
          <View style={style.preListContainerStyle}>
            {exData?.map(item => (
              <ExerciseSelectRow key={item.id} item={item} />
            ))}
          </View>
          {/* OK Button */}
          <TouchableOpacity
            onPress={() => {
              // Exercise_Read();
              // Exercise_Insert();
              // Exercise_Create();
            }}>
            <LinearGradient
              style={style.touchableOpacityStartStyle}
              start={{x: 1, y: 0}}
              end={{x: 0, y: 0}}
              colors={['#FA3B89', '#E10D60']}>
              <View className="flex-row justify-center items-center space-x-2">
                <Image source={assets.icn_start} />
                <Text className="text-base font-semibold text-white">Done</Text>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
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
});

export default ExerciseScreen;
