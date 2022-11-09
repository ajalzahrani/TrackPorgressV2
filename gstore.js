import create from 'zustand';
import {produce} from 'immer';
import uuid from 'react-native-uuid';

let gstore = (set, get) => ({
  sessions: [],
  exercise: [],
  startTime: new Date(),
  setTime: timeNow =>
    set(
      produce(draft => {
        draft.startTime = timeNow;
      }),
    ),
  registerSet: (exerId, setId, leftedWeight, reps, TUT) =>
    set(
      produce(draft => {
        let exercises = draft.exercise;
        let setData = {
          setno: setId,
          leftedWeight: leftedWeight,
          reps: reps,
          TUT: TUT,
        };
        let isFound = false;
        for (let i = 0; i < exercises.length; i++) {
          let isSetFound = false;
          let sets = exercises[i].set;
          if (exercises[i].exerciseID === exerId) {
            for (let j = 0; j < sets.length; j++) {
              if (sets[j].setno === setId) {
                sets.splice(j, 1, setData);
                isSetFound = true;
              }
            }
            if (!isSetFound) {
              sets.push(setData);
            }

            exercises[i].set = sets;
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
  lastSession: () => get().sessions[get().sessions.length - 1],
  registerSession: (duration, workoutId) =>
    set(
      produce(draft => {
        draft.sessions.push({
          session_id: uuid.v4(),
          datetime: new Date(Date.now()),
          startTime: get().startTime,
          endTime: new Date(Date.now()),
          duration: duration,
          workoutId: workoutId,
          exercises: get().exercise,
        });
      }),
    ),
});

export const useGstore = create(gstore);
