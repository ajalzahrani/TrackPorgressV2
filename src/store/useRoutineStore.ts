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
  stateId: {
    routineId: string;
    workoutId?: string;
    exerciseId?: string;
    dayId: number;
  };
};

type Actions = {
  setRoutineId: (routineId: string) => void;
  setWorkoutId: (workoutId: string) => void;
  setExerciseId: (exerciseId: string) => void;
  setDayId: (dayId: number) => void;
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
  setWeekDayWorkout: (routineId: string) => void;
};

const initialState: State = {
  routines: getRoutine(),
  stateId: {
    routineId: '',
    workoutId: '',
    exerciseId: '',
    dayId: new Date().getDay(),
  },
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

  setDayId: dayId =>
    set(
      produce((state: Draft<State & Actions>) => {
        state.stateId.dayId = dayId;
      }),
    ),

  setWeekDayWorkout: routineId =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          if (state.stateId.workoutId !== undefined)
            state.routines[routineIndex].weekdays[
              state.stateId.dayId
            ].workoutId = state.stateId.workoutId;
          const isworkoutday =
            state.routines[routineIndex].weekdays[state.stateId.dayId]
              .isWorkday;

          state.routines[routineIndex].weekdays[state.stateId.dayId].isWorkday =
            true;
        }
      }),
    ),

  updateExercises: (routineId, workoutId, exerciseId) =>
    set(
      produce((state: Draft<State & Actions>) => {
        const routineIndex = state.routines.findIndex(r => r.id === routineId);
        if (routineIndex !== -1) {
          console.log('routineIndex founded');
          console.log(state.routines[routineIndex].workouts);
          const workoutIndex = state.routines[routineIndex].workouts.findIndex(
            w => w.id === workoutId,
          );
          if (workoutIndex !== -1) {
            console.log('workoutIndex founded');

            const exerciseIndex = state.routines[routineIndex].workouts[
              workoutIndex
            ].exercises.findIndex(e => e.id === exerciseId);

            console.log(
              state.routines[routineIndex].workouts[workoutIndex].exercises,
            );
            if (exerciseIndex === -1) {
              state.routines[routineIndex].workouts[workoutIndex].exercises[
                exerciseIndex
              ] = {id: exerciseId, freq: []};
            } else {
              state.routines[routineIndex].workouts[workoutIndex].exercises =
                state.routines[routineIndex].workouts[
                  workoutIndex
                ].exercises.filter(e => e.id !== exerciseId);
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
