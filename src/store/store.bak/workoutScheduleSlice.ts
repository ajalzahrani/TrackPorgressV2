import {produce} from 'immer';
import {store} from '../Store';
import DefaultWeekdays from '../../assets/database/weekdays';
import uuidv4 from '../../components/shared/uuid4v';

export default workoutScheudleSlice = (set, get) => ({
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
          id: uuidv4(),
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

  assignWorkout: workoutId => {
    if (
      get().currentDay.workout === -1 &&
      get().scheduledWorkout?.title !== ''
    ) {
      get().selectScheduledWorkout(workoutId);
      get().addWorkoutDay(get().currentDay.id);
    }
  },

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

  unselectAll: () =>
    set(
      produce(draft => {
        draft.weekdays = DefaultWeekdays;
        draft.currentDay = {};
        draft.currentWorkout = {};
        draft.workouts = [];
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
        console.log('weekdays before ', draft.weekdays);
        draft.weekdays[indexOf] = draft.currentDay;
        console.log('weekdays after  ', draft.weekdays);
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
});
