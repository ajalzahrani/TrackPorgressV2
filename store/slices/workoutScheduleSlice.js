import {produce} from 'immer';
import uuid from 'react-native-uuid';

const workoutScheudleSlice = (set, get) => ({
  routines: [],
  currentRoutine: {},
  workouts: [],
  currentWorkout: {},
  exercises: [],
  currentExercise: {},
  weekdays: [],
  currentDay: {},

  addNewWorkout: workoutTitle =>
    set(
      produce(draft => {
        draft.currentWorkout = {
          id: uuid.v4(),
          title: workoutTitle,
          exercises: [],
          resttime: [0, 0],
        };
      }),
    ),

  deleteWorkout: workoutId =>
    set(
      produce(draft => {
        if (workoutId !== undefined) {
          let indexOf = draft.workouts.findIndex(workout => {
            return workout.id === workoutId;
          });
          draft.workouts.splice(indexOf, 1);
        }
      }),
    ),

  saveWorkout: () =>
    set(
      produce(draft => {
        let indexOf = draft.workouts.findIndex(workout => {
          return workout.id === draft.currentWorkout.id;
        });

        draft.saveExercises();

        if (indexOf === -1) {
          draft.workouts.push(draft.currentWorkout);
        } else {
          draft.workouts[indexOf] = draft.currentWorkout;
        }
      }),
    ),

  addNewExerciseWorkout: exerciseId =>
    set(
      produce(draft => {
        let indexOf = draft.exercises.findIndex(exercise => {
          return exercise.id === exerciseId;
        });
        if (indexOf === -1) {
          draft.exercises.push({id: exerciseId, freq: []});
        } else {
          draft.exercises.splice(indexOf, 1);
        }
      }),
    ),

  saveExercises: () =>
    set(
      produce(draft => {
        let indexOf = draft.exercises.findIndex(exercise => {
          return exercise.id === draft.currentExercise.id;
        });
        if (indexOf === -1) {
          draft.exercises.push(draft.currentExercise);
        } else {
          draft.exercises[indexOf] = draft.currentExercise;
        }
        draft.currentWorkout.exercises = draft.exercises;
      }),
    ),

  deleteExercise: exerciseId =>
    set(
      produce(draft => {
        let indexOf = draft.exercises.findIndex(exercise => {
          return exercise.id === exerciseId;
        });

        draft.exercises.splice(indexOf, 1);
      }),
    ),

  addFreq: freq =>
    set(
      produce(draft => {
        draft.currentExercise.freq = freq;
      }),
    ),

  addWorkoutDay: dayId =>
    set(
      produce(draft => {
        draft.currentDay = {id: dayId, workout: draft.currentWorkout.id};
      }),
    ),

  saveWorkoutDay: () =>
    set(
      produce(draft => {
        let indexOf = draft.weekdays.findIndex(day => {
          return day.id === draft.currentDay.id;
        });

        if (indexOf === -1) {
          draft.weekdays.push(draft.currentDay);
        } else {
          draft.weekdays[indexOf] = draft.currentDay;
        }
      }),
    ),

  addNewRoutine: (routineTitle, startDate, endDate, level) =>
    set(
      produce(draft => {
        draft.currentRoutine = {
          id: uuid.v4(),
          title: routineTitle,
          startdate: startDate,
          endate: endDate,
          level: level,
          workouts: draft.workouts,
          weekdays: draft.weekdays,
        };
      }),
    ),

  saveRoutine: () =>
    set(
      produce(draft => {
        let indexOf = draft.routines.findIndex(routine => {
          return routine.id === draft.currentRoutine.id;
        });

        draft.saveWorkout();
        draft.saveWorkoutDay();

        if (indexOf === -1) {
          draft.routines.push(draft.currentRoutine);
        } else {
          draft.routines[indexOf] = draft.currentRoutine;
        }
      }),
    ),

  deleteRoutine: routineId =>
    set(
      produce(draft => {
        let indexOf = draft.routines.findIndex(routine => {
          return routine.id === routineId;
        });

        draft.routines.splice(indexOf, 1);
      }),
    ),

  // helper functions
  getRoutineIndex: routineObj => {
    let routines = get().routines;
    let routineIndex = routines.findIndex(routine => {
      routine.id == routineObj.id;
    });

    return routineIndex;
  },
});
