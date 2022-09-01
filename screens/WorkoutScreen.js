import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Pressable,
  TextInput,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

// Assets
import {colors, exerciseData, assets} from '../components/constants';

// components
import AddNewWorkout from '../components/AddNew';
import ExerciseCard from '../components/ExerciseCard';
import AddExerciseModle from '../components/AddExerciseModle';

// Database
import {db, Exercise_Read, getCategories} from '../components/database';

// View of ExerciseParameters object
const ex = {
  id: 3,
  rep: [15, 12, 12, 10],
};

const WorkoutScreen = () => {
  const [workoutName, setWorkoutName] = useState(''); // workout name state
  const [modalVisible, setModalVisible] = useState(false); // workoutname alert modal state
  const [exercises, setExercises] = useState([]); // exercise list array state
  const [selectedExercisesNames, setSelectedExercisesNames] = useState([]);
  const [exerciseParam, setExerciseParam] = useState({});
  const [workoutId, setWorkoutId] = useState(-1);

  const navigation = useNavigation();

  // Workflow functions
  const SaveWorkout = () => {
    if (workoutName.length > 0) {
      // Save the workout parameters and goBack to schedule

      // insert into workout the title
      Workout_Insert();

      // get last inserted Id and set it to workoutId state
      Workout_ReadLastId();

      // update Schedule with the new Id from workoutId state
      Schedule_update();

      alert('Workout ' + workoutName + ' saved successfully');

      navigation.goBack();
    } else {
      // Prompet the user to enter workout name
      setModalVisible(true);
    }
  };

  const handleSetExercises = exerciseArray => {
    setExercises(exerciseArray);
  };

  // if element unchecked remove it from the array
  function checkIfExerSelected(id, array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === id) {
        return true;
      }
    }
    return false;
  }

  const handleSetExerciseParam = (exerId, reps) => {
    setExerciseParam(prev => {
      return {...prev};
    });
  };

  // I use this function in previous logic to select exercise and now is just for learn how to pass props throw navigatio.
  const selectExercise = exerId => {
    // FIXME: strange if you add curly bracts you will get error undefinded is not object.
    // setExercises(prev => {
    //   [...prev, exerId];
    // });
    // FIXME: strange this log doesn't print exercise state, but it does in useEffect.
    // console.log('select function call: ', exercises);
    // Solution is because this being called before render, so call this in return method will print.

    // check if the added exer already selelcted , if so then return
    if (checkIfExerSelected(exerId, exercises) === false) {
      setExercises(state => {
        return [...state, exerId];
      });
    }
  };

  // DATABASE OPS
  const Workout_Create = async () => {
    (await db).transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS Workout (id integer primary key autoincrement, title varchar(255), description varchar(500))`,
        [],
        (SQLTransaction, SQLResultSet) => {
          console.log('Table Workout was created successfully.');
        },
        error => {
          console.log('Error on creating Workout table: ', error.message);
        },
      );
    });
  };

  const WorkoutDetails_Create = async () => {
    (await db).transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS workoutDetails (wdId integer primary key autoincrement, wId integer, eId integer)`,
        [],
        (SQLTransaction, SQLResultSet) => {
          console.log('Table WorkoutDetails was created successfully.');
        },
        error => {
          console.log(
            'Error on creating WorkoutDetails table: ',
            error.message,
          );
        },
      );
    });
  };

  const Freq_Create = async () => {
    (await db).transaction(txn => {
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS Freq (fId integer primary key autoincrement, wdId integer, reps integer)`,
        [],
        (SQLTransaction, SQLResultSet) => {
          console.log('Table Freq was created successfully.');
        },
        error => {
          console.log('Error on creating Freq table: ', error.message);
        },
      );
    });
  };

  const Workout_Insert = () => {
    db.transaction(txn => {
      txn.executeSql(
        `insert into Workout (name) values (?)`,
        [workoutName],
        (SQLTransaction, SQLResultSet) => {
          console.log(`Workout added successfully.`);
          setWorkoutName('');
        },
        error => {
          console.log('Error on adding Workout: ', error.message);
        },
      );
    });
  };

  // When Workout Screen opend app will insert new record with workoutDetailsId and workoutid only
  // After selecting exercises

  const WorkoutDetails_Insert = () => {
    let workoutId = -1;
    let workoutDetialsId = -1;
    let exerciseId = -1;

    // Get the last inserted workoutId
    db.transaction(txn => {
      txn.executeSql(
        `select id from workout limit 1`,
        [],
        (SQLTransaction, SQLResultSet) => {
          let len = SQLResultSet.rows.length;

          if (len == 1) {
            workoutId = SQLResultSet.rows.item(0).id;
          } else {
            console.log('no result found in workout');
          }
        },
      );
    });

    // Make a Exercise parameter state as an object to hold exerciseId, sets, reps
    // Loop throw exercises state and insert each exercise with wokoutId
  };

  const Freq_Insert = (workoutDetialsId, reps) => {
    db.transaction(txn => {
      txn.executeSql(
        `insert into Freq (wdId, reps) values (?, ?)`,
        [workoutDetialsId, reps],
        (SQLTransaction, SQLResultSet) => {
          console.log(`Freq added successfully.`);
        },
        error => {
          console.log('Error on adding Freq: ', error.message);
        },
      );
    });
  };

  const Exercise_Read = () => {
    if (exercises.length == 0) return;

    let query = 'select id, name from ExerciesMaster where id in (';
    for (let i = 0; i < exercises.length; i++) {
      query = query + exercises[i];
      if (i === exercises.length - 1) {
        query = query + ')';
      } else {
        query = query + ',';
      }
    }

    return db.transaction(tx => {
      tx.executeSql(
        query,
        [JSON.stringify(exercises)],
        (SQLTransaction, SQLResultSet) => {
          console.log('Exercise from workoutscreen retrieved successfully');

          let len = SQLResultSet.rows.length;
          if (len > 0) {
            let result = [];
            for (let i = 0; i < len; i++) {
              let exeRow = SQLResultSet.rows.item(i);
              result.push({id: exeRow.id, name: exeRow.name});
            }
            setSelectedExercisesNames(result);
          }
        },
        error => {
          console.log('Error on reading exercises', error.message);
        },
      );
    });
  };

  const Workout_ReadLastId = () => {
    db.transaction(txn => {
      txn.executeSql(
        `select id from workout limit 1`,
        [],
        (SQLTransaction, SQLResultSet) => {
          let len = SQLResultSet.rows.length;

          if (len == 1) {
            setWorkoutId(SQLResultSet.rows.item(0).id);
          } else {
            console.log('no result found in workout');
          }
        },
      );
    });
  };

  const Schedule_update = () => {
    db.transaction(txn => {
      txn.executeSql(
        `update schedule set workoutId = ? where workoutId = 999`,
        [workoutId],
        (SQLTransaction, SQLResultSet) => {
          console.log('Schedule table updated successfully');
        },
        error => {
          console.log('Error on updating Schedule table', error.message);
        },
      );
    });
    setWorkoutId(-1);
  };

  useEffect(() => {
    console.log('array from workoutscreen: ', exercises);
    Exercise_Read();
  }, [exercises]);

  return (
    <SafeAreaView className="bg-[#112044] flex-1">
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={style.centeredView}>
          <View style={style.modalView}>
            <Text style={style.modalText}>Type in workout name</Text>
            <Pressable
              style={[style.button, style.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={style.textStyle}>Okey</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <View style={style.goBackStyle}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={assets.icn_goback} />
        </TouchableOpacity>
        <AddNewWorkout
          title={'Add new exercise'}
          navigateTo={{to: 'ExerciseScreen'}}
          // options={{selectExercise: selectExercise()}}

          // Logic how to pass props throw navigation
          // convert the props to object and pass >> continue to next component
          // options={{selectExercise: selectExercise}}
          options={{handleSetExercises: handleSetExercises}}
        />
      </View>
      <View style={{paddingHorizontal: 16, flex: 1}}>
        <TextInput
          placeholder="Workout name"
          placeholderTextColor={colors.offwhite}
          onChangeText={setWorkoutName}
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

        <View style={style.preWorkoutListContainerStyle}>
          <Text className="text-white">Pre-list of workouts</Text>
          <ScrollView contentContainerStyle={{paddingBottom: 72}}>
            {selectedExercisesNames?.map(element => {
              return <ExerciseCard key={element.id} exerName={element.name} />;
            })}
            <TouchableOpacity
              onPress={() => {
                SaveWorkout();
              }}>
              <LinearGradient
                style={style.touchableOpacityStartStyle}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#FA3B89', '#E10D60']}>
                <View className="flex-row justify-center items-center space-x-2">
                  <Image source={assets.icn_start} />
                  <Text className="text-base font-semibold text-white">
                    Sketch
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                alert('Hello');
              }}>
              <LinearGradient
                style={style.touchableOpacityStartStyle}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0}}
                colors={['#FA3B89', '#E10D60']}>
                <View className="flex-row justify-center items-center space-x-2">
                  <Image source={assets.icn_start} />
                  <Text className="text-base font-semibold text-white">
                    Check
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  touchableOpacityArrowStyle: {
    alignItems: 'flex-start',
    padding: 10,
    borderRadius: 100,
    backgroundColor: colors.secondary,
  },
  goBackStyle: {
    flexDirection: 'row',
    marginHorizontal: 16,
    alignItems: 'center',
  },
  preWorkoutListContainerStyle: {
    marginTop: 24,
    flex: 1,
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
    marginHorizontal: 24.5,
  },

  // modal style
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginTop: 22,
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

export default WorkoutScreen;
