import {openDatabase} from 'react-native-sqlite-storage';

const db = openDatabase(
  {name: 'TrackProgressv2_rn_sqlite', location: 'Documents'},
  successCB,
  errorCB,
);

function errorCB(err) {
  console.log('SQL Error: ' + err);
}

function successCB() {
  console.log('SQL executed fine');
}

function openCB() {
  console.log('Database OPENED');
}

// const DocExample = SQLite.openDatabase(
//   'test.db',
//   '1.0',
//   'Test Database',
//   200000,
//   openCB,
//   errorCB,
// );

// db.transaction(tx => {
//   tx.executeSql(
//     'SELECT * FROM Employees a, Departments b WHERE a.department = b.department_id',
//     [],
//     (tx, results) => {
//       console.log('Query completed');

//       // Get rows with Web SQL Database spec compliance.

//       var len = results.rows.length;
//       for (let i = 0; i < len; i++) {
//         let row = results.rows.item(i);
//         console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`);
//       }

//       // Alternatively, you can use the non-standard raw method.

//       /*
//         let rows = results.rows.raw(); // shallow copy of rows Array

//         rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
//       */
//     },
//   );
// });

const tables = {
  ExerciseMaster: 'ExerciseMaster',
  Workout: 'Workout',
  WorkoutDeaitls: 'WorkoutDeaitls',
  Schedule: 'Schedule',
};

// ExerciseMaster table ops

const getCategories = () => {
  db.transaction(txn => {
    txn.executeSql(
      `select exerciseid, name from ExerciesMaster`,
      [],
      (SQLTransaction, SQLResultSet) => {
        console.log(`Categories retrieved successfully.`);
        let lenght = SQLResultSet.rows.length;

        if (lenght > 0) {
          let result = [];
          for (let i = 0; i < lenght; i++) {
            let item = SQLResultSet.rows.item(i);
            result.push({id: item.id, name: item.name});
          }
          return 0;
        }
      },
      error => {
        console.log('Error on getting categories: ', error.message);
      },
    );
  });
};

// 0 Argument , return array
const Exercise_Read = () => {
  let query = `select exerciseid, name from ExerciesMaster`;

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
            console.log(SQLResultSet.rows.item(i));
          }
          //   console.log(result);
          return result;
        } else {
          return [];
        }
      },
      error => {
        console.log('Error on reading exercises', error.message);
      },
    );
  });
};

function Exercise_ReadById(exerciseId) {
  return `select exerciseid, name from ExerciesMaster where exerciseid = ${exerciseId}`;
}

const Exercise_insert = async (name, description = '') => {
  let query = `INSERT INTO ExerciesMaster (name,description) VALUES ('${name}','${description}');`;

  (await db).transaction(tx => {
    tx.executeSql(
      query,
      [],
      (tx, results) => {
        console.log('Exercise added successfully');
      },
      error => {
        console.log('Error on adding exercise', error.message);
      },
    );
  });
};

// Schedule Table ops

const createTablesTrans = async query => {
  (await db).transaction(txn => {
    txn.executeSql(
      query,
      [],
      (SQLTransaction, SQLResultSet) => {
        console.log('Table was created successfully.');
      },
      error => {
        console.log('Error on creating table: ', error.message);
      },
    );
  });
};

function dropAllTables() {
  let query = `DROP TABLE Schedule`;

  return db.transaction(tx => {
    tx.executeSql(
      query,
      [],
      (SQLTransaction, SQLResultSet) => {
        console.log('Table droped successfully !!!!!!');
      },
      error => {
        console.log('Error on droping table', error.message);
      },
    );
  });
}

// dropAllTables();

function createDatabaseTables() {
  //   createTablesTrans(createExerciesMasterQuery);
  // createTablesTrans(createScheduleQuery);
  // createTablesTrans(createWorkoutQuery);
  // createTablesTrans(createWorkoutDeaitlsQuery);
  // createTablesTrans(createDayQuery);
}

export {
  db,
  createDatabaseTables,
  Exercise_Read,
  Exercise_insert,
  getCategories,
};
