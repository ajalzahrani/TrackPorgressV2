import {openDatabase} from 'react-native-sqlite-storage';

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

/*
    Tables
ExerciseMaster
Workout
WorkoutDeaitls
Schedule
*/

const tables = {
  ExerciseMaster: 'ExerciseMaster',
  Workout: 'Workout',
  WorkoutDeaitls: 'WorkoutDeaitls',
  Schedule: 'Schedule',
};

const createExerciesMasterQuery = `      
CREATE TABLE IF NOT EXISTS "ExerciesMaster" (
	"exerciseId"	INTEGER NOT NULL,
	"name"	TEXT NOT NULL,
	"description"	TEXT,
	"icon"	NUMERIC,
	PRIMARY KEY("exerciseId" AUTOINCREMENT)
)   
`;

const createWorkoutQuery = `
CREATE TABLE IF NOT EXISTS "Workout" (
	"workoutId"	INTEGER,
	"title"	TEXT NOT NULL,
	PRIMARY KEY("workoutId" AUTOINCREMENT))
`;

const createWorkoutDeaitlsQuery = `
CREATE TABLE IF NOT EXISTS "workoutDetails" (
	"workoutDetailsId"	INTEGER NOT NULL,
	"workoutId"	INTEGER NOT NULL,
	"exerciseId"	INTEGER NOT NULL,
	PRIMARY KEY("workoutDetailsId" AUTOINCREMENT)
)
`;

const createScheduleQuery = `
CREATE TABLE IF NOT EXISTS "Schedule" (id INTEGER PRIMARY KEY NOT NULL, workoutId INTEGER NOT NULL, dayId INTEGER)
`;

const createDayQuery = `
CREATE TABLE IF NOT EXISTS "Days" (
	"dayId"	INTEGER NOT NULL,
	"name"	text NOT NULL,
	PRIMARY KEY("dayId" AUTOINCREMENT)
)
`;

// ExerciseMaster table ops
// 0 Argument , return array
const Exercise_Read = async () => {
  let query = `select exerciseid, name from ExerciesMaster`;

  (await db).transaction(tx => {
    tx.executeSql(
      query,
      [],
      (tx, results) => {
        console.log('Exercises retrieved successfully');

        let len = results.rows.length;
        if (len > 0) {
          let result = [];
          for (let i = 0; i < lenght; i++) {
            let exeRow = SQLResultSet.rows.item(i);
            // console.log('lenth = , ', len);
            result.push({id: exeRow.exerciseId, name: exeRow.name});
          }

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

const Exercise_insert = async (name, description = '', icon = '') => {
  let query = `INSERT INTO ExerciesMaster (name,description,icon) VALUES ('${name}','${description}','${icon}');`;

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

function Exercise_update(exerciesId, name, description) {
  return `update ExerciesMaster set name = '${name}', description = '${description}' where exerciseid = ${exerciesId}`;
}

function Exercise_delete(exerciseId) {
  return `delete from ExerciesMaster where exerciseid = ${exerciseId}`;
}

// Workout table ops
function Workout_Read() {
  return `select workoutId, title, description from Workout`;
}

function Workout_ReadById(workoutId) {
  return `select workoutId, title, description from Workout where workoutId = ${workoutId}`;
}

function Workout_insert(title, description = '') {
  return `INSERT INTO Workout (title,description) VALUES ('${title}','${description}');`;
}

function Workout_update(workoutId, title, description) {
  return `update Workout set title = '${title}', description = '${description}' where workoutId = ${workoutId}`;
}

function Workout_delete(workoutId) {
  return `delete from Workout where workoutid = ${workoutId}`;
}

// WorkoutDetails table ops
function WorkoutDetails_Read() {
  return `SELECT workoutDetailsId, workoutid, exerciseid FROM workoutDetails`;
}

function WorkoutDetails_ReadById(workoutDetailsId) {
  return `select workoutDetailsId, workoutId, exerciseid from workoutDetails where workoutDetailsId = ${workoutDetailsId}`;
}

function WorkoutDetails_insert(workoutId, exerciseId) {
  return `INSERT INTO workoutDetails (workoutId,exerciseId) VALUES ('${workoutId}','${exerciseId}');`;
}

function WorkoutDetails_update(workoutDetailsId, workoutId) {
  return `update workoutDetails set workoutid = ${workoutId}, exerciseid = ${exerciseId} where workoutDetailsId = ${workoutDetailsId}`;
}

function WorkoutDetails_delete(workoutDetailsId) {
  return `delete from workoutDetails where workoutDetailsId = ${workoutDetailsId}`;
}

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

function createDatebase() {
  db = openDatabase(
    {name: 'TrackProgressv2_rn_sqlite', location: 'Documents'},
    successCB,
    errorCB,
  );
}

function createDatabaseTables() {
  createTablesTrans(createExerciesMasterQuery);
  createTablesTrans(createScheduleQuery);
  createTablesTrans(createWorkoutQuery);
  createTablesTrans(createWorkoutDeaitlsQuery);
  createTablesTrans(createDayQuery);
}

export {createDatebase, createDatabaseTables, Exercise_Read};
