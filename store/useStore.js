import create from 'zustand';
import {store} from '../Store';
import workoutScheduleSlice from './slices/workoutScheduleSlice';
import exerciseSlice from './slices/exerciseSlice';

const KEY_ROUTINES = 'routines';
const KEY_EXERCISES = 'exercises';
const KEY_SESSIONS = 'sessions';

const useStore = create((set, get) => ({
  ...workoutScheduleSlice(set, get),
  ...exerciseSlice(set, get),
}));

const getRoutine = () => {
  if (store.contains(KEY_ROUTINES)) {
    return JSON.parse(store.getString(KEY_ROUTINES));
  } else {
    return [];
  }
};

const geExercisesMaster = () => {
  if (store.contains(KEY_EXERCISES)) {
    return JSON.parse(store.getString(KEY_EXERCISES));
  } else {
    return [];
  }
};

// const getSessions = () => {
//   if (store.contains(KEY_SESSIONS)) {
//     return JSON.parse(store.getString(KEY_SESSIONS));
//   } else {
//     return [];
//   }
// };

// Preload store
useStore.setState(() => ({routines: getRoutine()}));
useStore.setState(() => ({exercisesMaster: geExercisesMaster()}));
// useStore.setState(() => ({sessions: getSessions()}));

export default useStore;
