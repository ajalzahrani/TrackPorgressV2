import create from 'zustand';
import {produce} from 'immer';
import {store} from '../mmkv';
import uuidv4 from 'src/components/shared/uuid4v';

type State = {
  exerciseMaster: {
    id: string;
    title: string;
  }[];
};

type Actions = {
  saveNewExerciseMaster: (exerciseTitle: string) => void;
};

const initialState: State = {
  exerciseMaster: [],
};

const useExerciseStore = create<State & Actions>((set, get) => ({
  ...initialState,
  saveNewExerciseMaster: exerciseTitle =>
    set(
      produce(draft => {
        const newExercise = {
          id: uuidv4(),
          title: exerciseTitle,
        };
        console.log(newExercise);

        draft.exercisesMaster.push(newExercise);
        store.set('exercises', JSON.stringify(draft.exercisesMaster));
      }),
    ),
}));

export default useExerciseStore;
