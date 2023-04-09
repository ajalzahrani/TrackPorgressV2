import create from 'zustand';
import {produce} from 'immer';
import {store} from '../mmkv';
import {workoutType} from 'src/components/shared/globalTypes';

const workoutGlobalKey = 'workout';

const getWorkout = (): workoutType[] => {
  const workoutString = store.getString(workoutGlobalKey);
  return store.contains(workoutGlobalKey) && typeof workoutString === 'string'
    ? JSON.parse(workoutString)
    : [];
};

type State = {
  workouts: workoutType[];
};

type Actions = {
  addNewWorkout: (workout: workoutType) => void;
  updateWorkout: (workoutId: string, workout: Partial<workoutType>) => void;
  deleteWorkout: (workoutId: string) => void;
};

const initialState: State = {
  workouts: [],
};

const useWorkoutStore = create<State & Actions>((set, get) => ({
  ...initialState,
  addNewWorkout: (workout: workoutType) => {
    set(
      produce((draft: State) => {
        draft.workouts.push(workout);
        store.set(workoutGlobalKey, JSON.stringify(workout));
      }),
    );
  },
  updateWorkout: (workoutId: string, workout: Partial<workoutType>) => {
    set(
      produce((draft: State) => {
        const index = draft.workouts.findIndex(w => w.id === workoutId);
        if (index !== -1) {
          Object.assign(draft.workouts[index], workout);
        }
      }),
    );
  },
  deleteWorkout: (workoutId: string) => {
    set(
      produce((draft: State) => {
        draft.workouts = draft.workouts.filter(w => w.id !== workoutId);
      }),
    );
  },
}));

export default useWorkoutStore;
