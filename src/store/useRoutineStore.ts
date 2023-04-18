import create from 'zustand';
import {store} from './mmkv';
import produce, {Draft} from 'immer';
import {routineType, workoutType} from 'src/components/shared/globalTypes';
import def from 'src/components/shared/GlobalDefinition';

const getRoutine = (): routineType[] => {
  const routineString = store.getString(def.routineGlobalKey);
  return store.contains(def.routineGlobalKey) &&
    typeof routineString === 'string'
    ? JSON.parse(routineString)
    : [];
};

type State = {
  routines: routineType[];
  workoutId: string;
  dayId: number;
};

type Actions = {
  addNewRoutine: (routineId: string, routine: routineType) => void;
  // updateRoutine: (routineId: string, routine: routineType) => void;
  deleteRoutine: (routineId: string) => void;
  // addWorkout: (routineId: string, workout: workoutType) => void;
  addWorkout: (
    routineId: string,
    workoutId: string,
    workout: workoutType,
  ) => void;
  deleteWorkout: (routineId: string, workoutId: string) => void;
  setWorkoutId: (workoutId: string) => void;
  setDayId: (dayId: number) => void;
  setWeekDayWorkout: (routineId: string) => void;
  updateExercises: (
    routineId: string,
    workoutId: string,
    exerciseId: string,
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
  workoutId: '',
  dayId: new Date().getDay(),
};

const useRoutineStore = create<State & Actions>((set, get) => ({
  ...initialState,

  addNewRoutine: (routineId, routine) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          state.routines[routineIndex] = routine;
        } else {
          state.routines.push(routine);
          store.set(def.routineGlobalKey, JSON.stringify(state.routines));
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

  setWorkoutId: workoutId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.workoutId = workoutId;
      }),
    ),

  setDayId: dayId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.dayId = dayId;
      }),
    ),

  setWeekDayWorkout: routineId =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          state.routines[routineIndex].weekdays[state.dayId].workout =
            state.workoutId;
          const isworkoutday =
            state.routines[routineIndex].weekdays[state.dayId].isWorkday;
          console.log(isworkoutday);

          state.routines[routineIndex].weekdays[state.dayId].isWorkday = true;
        }
      }),
    ),

  updateExercises: (routineId, workoutId, exerciseId) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          const workoutIndex = state.routines[routineIndex].workouts.findIndex(
            w => w.id === workoutId,
          );
          if (workoutIndex !== -1) {
            const exerciseIndex = state.routines[routineIndex].workouts[
              workoutIndex
            ].exercises.findIndex(e => e.id === exerciseId);
            if (exerciseIndex === -1) {
              state.routines[routineIndex].workouts[workoutIndex].exercises[
                exerciseIndex
              ] = {id: exerciseId, freq: []};
            }
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
