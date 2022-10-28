import create from 'zustand';
import {produce} from 'immer';

let gstore = (set, get) => ({
  sessions: [],
  exercise: [],
  registerSet: (exerId, setData) =>
    set(
      produce(draft => {
        let exercises = draft.exercise;
        let isFound = false;
        for (let i = 0; i < exercises.length; i++) {
          if (exercises[i].exerciseID === exerId) {
            exercises[i].set.push(setData);
            isFound = true;
          }
        }
        if (!isFound) {
          exercises.push({exerciseID: exerId, set: [setData]});
        }

        draft.exercise = exercises;
      }),
    ),
  printVol: () => get().exercise,
});

export const useGstore = create(gstore);
