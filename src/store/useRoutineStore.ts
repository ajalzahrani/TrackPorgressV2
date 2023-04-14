import create from 'zustand';
import {store} from './mmkv';
import uuid from 'react-native-uuid';
import produce, {Draft} from 'immer';
import {
  routineType,
  workoutType,
  exercisesType,
} from 'src/components/shared/globalTypes';

const routineGlobalKey = 'routine';

const getRoutine = (): routineType[] => {
  const routineString = store.getString(routineGlobalKey);
  return store.contains(routineGlobalKey) && typeof routineString === 'string'
    ? JSON.parse(routineString)
    : [];
};

type State = {
  routines: routineType[];
  stateId: {routineId: string; workoutId?: string; exerciseId?: string};
};

type Actions = {
  setRoutineId: (routineId: string) => void;
  setWorkoutId: (workoutId: string) => void;
  setExerciseId: (exerciseId: string) => void;
  deleteWorkout: (routineId: string, workoutId: string) => void;
  addNewRoutine: (routineId: string, routine: routineType) => void;
  deleteRoutine: (routineId: string) => void;
  addWorkout: (
    routineId: string,
    workoutId: string,
    workout: workoutType,
  ) => void;

  updateExercises: (
    routineId: string,
    workoutId: string,
    exercises: exercisesType,
  ) => void;
  addFreq: (
    routineId: string,
    workoutId: string,
    exerciseId: string,
    freq: number[],
  ) => void;
  deleteExercise: (
    routineId: string,
    workoutId: string,
    exerciseId: string,
  ) => void;
};

const initialState: State = {
  routines: getRoutine(),
  stateId: {routineId: '', workoutId: '', exerciseId: ''},
};

const useRoutineStore = create<State & Actions>((set, get) => ({
  ...initialState,

  setRoutineId: routineId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.stateId.routineId = routineId;
        state.stateId.workoutId = undefined;
        state.stateId.exerciseId = undefined;
      }),
    ),
  setWorkoutId: workoutId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.stateId.workoutId = workoutId;
        state.stateId.exerciseId = undefined;
      }),
    ),
  setExerciseId: exerciseId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.stateId.exerciseId = exerciseId;
      }),
    ),

  addNewRoutine: (routineId, routine) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          state.routines[routineIndex] = routine;
        } else {
          state.routines.push(routine);
          store.set(routineGlobalKey, JSON.stringify(state.routines));
        }
      }),
    ),

  deleteRoutine: routineId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.routines = state.routines.filter(r => r.id !== routineId);
      }),
    ),

  addWorkout: (routineId, workoutId, workout) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          const workoutIndex = state.routines[routineIndex].workouts.findIndex(
            w => w.id === workoutId,
          );
          if (workoutIndex !== -1) {
            state.routines[routineIndex].workouts[workoutIndex] = workout;
          } else {
            state.routines[routineIndex].workouts.push(workout);
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

  updateExercises: (routineId, workoutId, exercises) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          const workoutIndex = state.routines[routineIndex].workouts.findIndex(
            w => w.id === workoutId,
          );
          if (workoutIndex !== -1) {
            state.routines[routineIndex].workouts[workoutIndex].exercises = [];
          }
        }
      }),
    ),

  addFreq: (routineId, workoutId, exerciseId, freq) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          const workoutIndex = state.routines[routineIndex].workouts.findIndex(
            w => w.id === workoutId,
          );
          if (workoutIndex !== -1) {
            const workout = state.routines[routineIndex].workouts[workoutIndex];
            if (workout !== undefined) {
              const exercises = workout.exercises;
              const exercise = exercises.find(e => e.id === exerciseId);
              if (exercise !== undefined) {
                exercise.freq = freq;
              }
              workout.exercises = exercises;
            }
          }
        }
      }),
    ),

  deleteExercise: (routineId, workoutId, exerciseId) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          const workoutIndex = state.routines[routineIndex].workouts.findIndex(
            w => w.id === workoutId,
          );
          if (workoutIndex !== -1) {
            const workout = state.routines[routineIndex].workouts[workoutIndex];
            if (workout !== undefined) {
              const exerciseNew = state.routines[routineIndex].workouts[
                workoutIndex
              ].exercises.filter(e => e.id !== exerciseId);
              state.routines[routineIndex].workouts[workoutIndex].exercises =
                exerciseNew;
            }
          }
        }
      }),
    ),
}));

export default useRoutineStore;

// updateRoutine: (routineId, routine) =>
//   set(
//     produce((state: Draft<State & Actions>) => {
//       const index = state.routines.findIndex(r => r.id === routineId);
//       if (index !== -1) {
//         state.routines[index] = routine;
//       }
//     }),
//   ),

// addWorkout: (routineId, workout) =>
//   set(
//     produce((state: Draft<State & Actions>) => {
//       const routineIndex = state.routines.findIndex(r => r.id === routineId);
//       if (routineIndex !== -1) {
//         state.routines[routineIndex].workouts.push(workout);
//       }
//     }),
//   ),
