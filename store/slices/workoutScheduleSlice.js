import {produce} from 'immer';
import uuid from 'react-native-uuid';
import {store} from '../../Store';
import DefaultWeekdays from '../../components/database/weekdays';

export default workoutScheudleSlice = (set, get) => ({
  routines: [],
  currentRoutine: {},
  workouts: [],
  currentWorkout: {},
  scheduledWorkout: {},
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

  addWorkoutTitle: workoutTitle =>
    set(
      produce(draft => {
        draft.currentWorkout.title = workoutTitle;
      }),
    ),

  addNewExerciseWorkout: exerciseId =>
    set(
      produce(draft => {
        let indexOf = draft.currentWorkout.exercises.findIndex(exercise => {
          return exercise.id === exerciseId;
        });

        if (indexOf === -1) {
          draft.currentWorkout.exercises.push({id: exerciseId, freq: []});
        } else {
          draft.currentWorkout.exercises.splice(indexOf, 1);
        }
      }),
    ),

  addFreq: freq =>
    set(
      produce(draft => {
        draft.currentExercise.freq = freq;
      }),
    ),

  addRestTime: (id, timeValue) =>
    set(
      produce(draft => {
        let updateRestTime = draft.currentWorkout?.resttime;
        if (id == 0) {
          // Update rest time for set
          updateRestTime[0] = timeValue;
        } else {
          // Update rest time for exercise
          updateRestTime[1] = timeValue;
        }

        draft.currentWorkout.resttime = updateRestTime;
      }),
    ),

  addWorkoutDay: dayId =>
    set(
      produce(draft => {
        let indexOf = draft.weekdays.findIndex(day => day.id === dayId);
        if (indexOf !== -1) {
          draft.weekdays[indexOf].workday = true;
          draft.weekdays[indexOf].workout = draft.scheduledWorkout.id;
        }
      }),
    ),

  addNewRoutine: (
    routineTitle,
    startDate = new Date(),
    endDate = new Date(),
    level = 'beginner',
  ) =>
    set(
      produce(draft => {
        draft.currentRoutine = {
          id: uuid.v4(),
          title: routineTitle,
          startdate: startDate,
          endate: endDate,
          level: level,
          workouts: [],
          weekdays: DefaultWeekdays,
        };

        draft.weekdays = DefaultWeekdays;
        draft.currentDay = {};
        draft.currentWorkout = {};
      }),
    ),

  selectCurrentWorkout: workoutId =>
    set(
      produce(draft => {
        let indexOf = draft.workouts.findIndex(
          workout => workout.id === workoutId,
        );
        if (indexOf !== -1) {
          draft.currentWorkout = draft.workouts[indexOf];
        } else {
          draft.currentWorkout = {};
        }
      }),
    ),

  selectScheduledWorkout: workoutId =>
    set(
      produce(draft => {
        let indexOf = draft.workouts.findIndex(
          workout => workout.id === workoutId,
        );
        if (indexOf !== -1) {
          draft.scheduledWorkout = draft.workouts[indexOf];
        } else {
          draft.scheduledWorkout = {};
        }
      }),
    ),

  selectCurrentDay: dayId =>
    set(
      produce(draft => {
        let indexOf = draft.weekdays.findIndex(day => day.id === dayId);

        if (indexOf !== -1) {
          draft.currentDay = draft.weekdays[indexOf];
        } else {
          draft.currentDay = {};
        }
      }),
    ),

  selectCurrentRoutine: routineId =>
    set(
      produce(draft => {
        let indexOf = draft.routines.findIndex(
          routine => routine.id === routineId,
        );
        if (indexOf !== -1) {
          draft.currentRoutine = draft.routines[indexOf];
          draft.workouts = draft.currentRoutine.workouts;
          draft.weekdays = draft.currentRoutine.weekdays;

          // const currentDayWorkout =
          //   draft.weekdays[new Date().getDay() + 1].workout;

          // draft.currentWorkout = draft.workouts[currentDayWorkout];
        }
      }),
    ),

  unselectCurrentWorkout: () =>
    set(
      produce(draft => {
        draft.currentWorkout = {};
        draft.scheduledWorkout = {};
      }),
    ),

  unselectCurrentDay: dayId =>
    set(
      produce(draft => {
        let indexOf = draft.weekdays.findIndex(day => day.id === dayId);

        if (indexOf !== -1) {
          draft.weekdays[indexOf].workday = false;
          draft.weekdays[indexOf].workout = -1;
        }
      }),
    ),

  unselectCurrentRoutine: () =>
    set(
      produce(draft => {
        console.log('I am here');
        draft.exercises = [];
        draft.currentExercise = {};
        draft.workouts = [];
        draft.currentWorkout = {};
        draft.currentDay = {};
        draft.currentRoutine = {};

        console.log('Exercises', draft.exercises);
        console.log('CurrentExercise', draft.currentExercise);
        console.log('workouts', draft.workouts);
        console.log('currentWorkout', draft.currentWorkout);
        console.log('weekdays', draft.weekdays);
        console.log('currentday', draft.currentDay);
        console.log('currentroutine', draft.currentRoutine);
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

  saveWorkout: () =>
    set(
      produce(draft => {
        let indexOf = draft.workouts.findIndex(workout => {
          return workout.id === draft.currentWorkout.id;
        });

        if (indexOf === -1) {
          draft.workouts.push(draft.currentWorkout);
        } else {
          draft.workouts[indexOf] = draft.currentWorkout;
        }
      }),
    ),

  saveWorkoutDay: () =>
    set(
      produce(draft => {
        let indexOf = draft.weekdays.findIndex(day => {
          return day.id === draft.currentDay.id;
        });
        console.log('current day ', draft.currentDay);
        console.log('before ', draft.weekdays);
        draft.weekdays[indexOf] = draft.currentDay;
        console.log('after  ', draft.weekdays);
      }),
    ),

  saveRoutine: () =>
    set(
      produce(draft => {
        let indexOf = draft.routines.findIndex(routine => {
          return routine.id === draft.currentRoutine.id;
        });

        // draft.saveWorkouts();
        // draft.saveWorkoutDay();

        draft.currentRoutine.workouts = draft.workouts;
        draft.currentRoutine.weekdays = draft.weekdays;

        if (indexOf === -1) {
          draft.routines.push(draft.currentRoutine);
        } else {
          draft.routines[indexOf] = draft.currentRoutine;
        }

        store.set('routines', JSON.stringify(draft.routines));
      }),
    ),

  deleteExercise: exerciseId =>
    set(
      produce(draft => {
        let indexOf = draft.currentWorkout.exercises.findIndex(exercise => {
          return exercise.id === exerciseId;
        });

        draft.currentWorkout.exercises.splice(indexOf, 1);
      }),
    ),

  deleteWorkout: workoutId =>
    set(
      produce(draft => {
        let indexOf = draft.workouts.findIndex(workout => {
          return workout.id === workoutId;
        });

        if (indexOf !== -1) {
          draft.workouts.splice(indexOf, 1);
          draft.currentWorkout = {};
          draft.scheduledWorkout = {};
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
});
