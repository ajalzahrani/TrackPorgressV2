import {produce} from 'immer';
import uuidv4 from '../../../components/shared/uuid4v';
import {store} from '../../../Store';

export default exerciseSlice = (set, get) => ({
  exercisesMaster: [],

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
});
