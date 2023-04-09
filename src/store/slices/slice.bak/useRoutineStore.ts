import create from 'zustand';
import produce from 'immer';
import {store} from '../../mmkv';
import {routineType} from 'src/components/shared/globalTypes';

const routineGlobalKey = 'routine';

const getRoutine = (): routineType[] => {
  const routineString = store.getString(routineGlobalKey);
  return store.contains(routineGlobalKey) && typeof routineString === 'string'
    ? JSON.parse(routineString)
    : [];
};

type State = {
  routines: routineType[];
};

type Actions = {
  addNewRoutine: (routine: routineType) => void;
  updateRoutine: (routineId: string, routine: routineType) => void;
  deleteRoutine: (routineId: string) => void;
};

const initialState: State = {
  routines: getRoutine(),
};

export const useRoutineStore = create<State & Actions>(set => ({
  ...initialState,

  addNewRoutine: routine =>
    set(
      produce(draft => {
        draft.routines.push(routine);
        store.set(routineGlobalKey, JSON.stringify(draft.routines));
      }),
    ),

  updateRoutine: (routineId, routine) =>
    set(
      produce(draft => {
        const index = draft.routines.findIndex(r => r.id === routineId);
        if (index !== -1) {
          draft.routines[index] = routine;
        }
      }),
    ),

  deleteRoutine: routineId =>
    set(
      produce(draft => {
        draft.routines = draft.routines.filter(r => r.id !== routineId);
      }),
    ),
}));
