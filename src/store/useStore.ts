import create from 'zustand';
import {store} from './mmkv';
import workoutScheduleSlice from './slices/slice.bak/workoutScheduleSlice';
import routineSlice from './slices/slice.bak/routineSlice';
import useExerciseMaster from './slices/useExerciseMaster';

const KEY_ROUTINES = 'routines';
const KEY_EXERCISES = 'exercises';
const KEY_SESSIONS = 'sessions';

const useStore = create((set, get) => ({
  ...workoutScheduleSlice(set, get),
  ...useExerciseMaster(set, get),
  ...routineSlice(set, get),
}));
q;

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
