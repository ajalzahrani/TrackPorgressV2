import create from 'zustand';
import {produce} from 'immer';
import uuid from 'react-native-uuid';

let gstore = (set, get) => ({
  sessions: [],
  exercise: [],
  registerSet: (exerId, leftedWeight, reps, TUT) =>
    set(
      produce(draft => {
        let exercises = draft.exercise;
        let setData = {
          setno: uuid.v4(),
          leftedWeight: leftedWeight,
          reps: reps,
          TUT: TUT,
        };
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
  printExer: () => get().exercise,
  printVol: () => get().sessions,
  registerSession: (duration, workoutId) =>
    set(
      produce(draft => {
        draft.sessions.push({
          session_id: uuid.v4(),
          datetime: Date.now(),
          duration: duration,
          workoutId: workoutId,
          exercises: get().exercise,
        });
      }),
    ),
});

export const useGstore = create(gstore);
