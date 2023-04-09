import create from 'zustand';
import {produce} from 'immer';
import {store} from './mmkv';
import uuid from 'react-native-uuid';
import {exerciseMasterType} from 'src/components/shared/globalTypes';

type State = {
  exerciseMaster: exerciseMasterType[];
};

type Actions = {
  addNewExerciseMaster: (name: string) => void;
};

const initialState: State = {
  exerciseMaster: [],
};

const useExerciseStore = create<State & Actions>((set, get) => ({
  ...initialState,
  addNewExerciseMaster: name =>
    set(
      produce(draft => {
        const newExercise = {
          id: uuid,
          name: name,
        };
        draft.exercisesMaster.push(newExercise);
        store.set('exercises', JSON.stringify(draft.exercisesMaster));
      }),
    ),
}));

export default useExerciseStore;
