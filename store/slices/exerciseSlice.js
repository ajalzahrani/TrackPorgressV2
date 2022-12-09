import {produce} from 'immer';
import uuid from 'react-native-uuid';
import {store} from '../../Store';

export default exerciseSlice = (set, get) => ({
  exercisesMaster: [],

  SaveNewExerciseMaster: exerciseTitle =>
    set(
      produce(draft => {
        const newExercise = {
          id: uuid.v4(),
          title: exerciseTitle,
        };

        draft.exercisesMaster.push(newExercise);
        store.set('exercises', JSON.stringify(draft.exercisesMaster));
      }),
    ),
});
