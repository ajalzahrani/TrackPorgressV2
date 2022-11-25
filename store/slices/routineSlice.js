import {produce} from 'immer';

const routineSlice = (set, get) => ({
  routines: [],

  // add routin
  addRoutine: routineObj =>
    set(
      produce(draft => {
        draft.routines.push(routineObj);
      }),
    ),

  // read routine by id
  getRoutineById: id => {
    let routineObj = get().routines.filter((element, index) => {
      if (element.id === id) {
        return element;
      }
    });
    return routineObj;
  },

  // update routine
  updateRoutine: routineObj =>
    set(
      produce(draft => {
        const routineIndex = draft.getRoutineIndex(routineObj);
        draft.routines[routineIndex] = routineObj;
      }),
    ),

  // delete routine
  deleteRoutine: routineObj =>
    set(
      produce(draft => {
        const routineIndex = draft.getRoutineIndex(routineObj);
        draft.routines.splice(routineIndex, 1);
      }),
    ),

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
