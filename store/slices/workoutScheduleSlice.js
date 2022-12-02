import {produce} from 'immer';

const workoutScheudleSlice = (set, get) => ({
  workouts: [],

  // helper functions
  getRoutineIndex: routineObj => {
    let routines = get().routines;
    let routineIndex = routines.forEach((element, index) => {
      if (element.id == routineObj.id) {
        return index;
      }
    });
    return routineIndex;
  },
});
