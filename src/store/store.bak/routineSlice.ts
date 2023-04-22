import create from 'zustand';
import {produce} from 'immer';
import {store} from '../mmkv';
import uuidv4 from 'src/components/shared/uuid4v';
import DefaultWeekdays from '../../assets/database/weekdays';
import {routineType} from 'src/types';

type State = {
  routines: routineType[];
};

type Actions = {
  addNewRoutine: () => void;
  updateRoutine: () => void;
  deleteRoutine: () => void;
};

const initialState: State = {
  exerciseMaster: [],
};

export default routineSlice = (set, get) => ({
  routines: [],
  currentRoutine: {},

  addNewRoutine: (
    routineTitle,
    startDate = new Date(),
    endDate = new Date(),
    level = 'beginner',
    description = '',
  ) =>
    set(
      produce(draft => {
        draft.currentRoutine = {
          id: uuidv4(),
          title: routineTitle,
          startDate: startDate,
          endDate: endDate,
          level: level,
          description: description,
          workouts: [],
          weekdays: DefaultWeekdays,
        };
      }),
      get().unselectAll(),
    ),

  updateCurrentRoutine: (
    routineTitle,
    startDate,
    endDate,
    level,
    description = '',
  ) =>
    set(
      produce(draft => {
        draft.currentRoutine.title = routineTitle;
        draft.currentRoutine.startDate = startDate;
        draft.currentRoutine.endDate = endDate;
        draft.currentRoutine.level = level;
        draft.currentRoutine.description = description;
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
        } else {
          draft.currentRoutine = {};
          draft.workouts = [];
          draft.weekdays = [];
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

  commitRoutine: () =>
    set(
      produce(draft => {
        draft.currentRoutine.workouts = draft.workouts;
        draft.currentRoutine.weekdays = draft.weekdays;
      }),
    ),

  compareRoutinesObj: () => {
    let indexOf = get().routines.findIndex(routine => {
      return routine.id === get().currentRoutine.id;
    });

    get().commitRoutine();

    return (
      JSON.stringify(get().currentRoutine) ===
      JSON.stringify(get().routines[indexOf])
    );
  },

  saveRoutine: () =>
    set(
      produce(draft => {
        let indexOf = draft.routines.findIndex(routine => {
          return routine.id === draft.currentRoutine.id;
        });

        // draft.currentRoutine.workouts = draft.workouts;
        // draft.currentRoutine.weekdays = draft.weekdays;

        if (indexOf === -1) {
          draft.routines.push(draft.currentRoutine);
        } else {
          draft.routines[indexOf] = draft.currentRoutine;
        }

        store.set('routines', JSON.stringify(draft.routines));
      }),
    ),

  deleteRoutine: routineId =>
    set(
      produce(draft => {
        let indexOf = draft.routines.findIndex(routine => {
          return routine.id === routineId;
        });

        draft.routines.splice(indexOf, 1);
        store.set('routines', JSON.stringify(draft.routines));
      }),
    ),
});
