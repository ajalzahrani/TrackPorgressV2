import create from 'zustand';
import {produce} from 'immer';
import {store} from '../mmkv';
import uuid from 'react-native-uuid';
import {exerciseMasterType} from 'src/components/shared/globalTypes';
import uuidv4 from 'src/components/shared/uuid4v';

type State = {
  exerciseMaster: exerciseMasterType[];
};

type Actions = {
  saveNewExerciseMaster: (name: string) => void;
};

const initialState: State = {
  exerciseMaster: [],
};

const useExerciseStore = create<State & Actions>((set, get) => ({
  ...initialState,
  saveNewExerciseMaster: name =>
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
