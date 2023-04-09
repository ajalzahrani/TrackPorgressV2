import create from 'zustand';
import {store} from '../mmkv';
import uuid from 'react-native-uuid';
import produce, {Draft} from 'immer';
import {routineType, workoutType} from 'src/components/shared/globalTypes';

const routineGlobalKey = 'routine';

const getRoutine = (): routineType[] => {
  const routineString = store.getString(routineGlobalKey);
  return store.contains(routineGlobalKey) && typeof routineString === 'string'
    ? JSON.parse(routineString)
    : [];
};

type State = {
  routines: routineType[];
  workoutId: string;
};

type Actions = {
  addNewRoutine: (routine: routineType) => void;
  updateRoutine: (routineId: string, routine: routineType) => void;
  deleteRoutine: (routineId: string) => void;
  addWorkout: (routineId: string, workout: workoutType) => void;
  updateWorkout: (
    routineId: string,
    workoutId: string,
    workout: workoutType,
  ) => void;
  deleteWorkout: (routineId: string, workoutId: string) => void;
  setWorkoutId: (workoutId: string) => void;
};

const initialState: State = {
  routines: getRoutine(),
};

const useRoutineStore = create<State & Actions>((set, get) => ({
  ...initialState,

  addNewRoutine: routine =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.routines.push(routine);
        store.set(routineGlobalKey, JSON.stringify(state.routines));
      }),
    ),

  updateRoutine: (routineId, routine) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const index = state.routines.findIndex(r => r.id === routineId);
        if (index !== -1) {
          state.routines[index] = routine;
        }
      }),
    ),

  deleteRoutine: routineId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.routines = state.routines.filter(r => r.id !== routineId);
      }),
    ),

  addWorkout: (routineId, workout) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          state.routines[routineIndex].workouts.push(workout);
        }
      }),
    ),

  updateWorkout: (routineId, workoutId, workout) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          const workoutIndex = state.routines[routineIndex].workouts.findIndex(
            w => w.id === workoutId,
          );
          if (workoutIndex !== -1) {
            state.routines[routineIndex].workouts[workoutIndex] = workout;
          }
        }
      }),
    ),

  deleteWorkout: (routineId, workoutId) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          state.routines[routineIndex].workouts = state.routines[
            routineIndex
          ].workouts.filter(w => w.id !== workoutId);
        }
      }),
    ),

  setWorkoutId: workoutId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.workoutId = workoutId;
      }),
    ),
}));

export default useRoutineStore;
