import create from 'zustand';
import {produce} from 'immer';
import uuid from 'react-native-uuid';
import {store} from './Store';
import moment from 'moment';

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
        let isExFound = false;
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
            isExFound = true;
          }
        }
        if (!isExFound) {
          exercises.push({exerciseID: exerId, set: [setData]});
        }

        draft.exercise = exercises;
      }),
    ),
  printExer: () => get().exercise,
  printVol: () => get().sessions,
  getLastSession: () => {
    return get().sessions[get().sessions.length - 1];
  },
  getSessionByDate: date => {
    let daySession = [];
    for (let i = 0; i < get().sessions.length; i++) {
      if (moment(get().sessions[i].datetime).format('YYYY-MM-DD') === date) {
        daySession.push(get().sessions[i]);
      }
    }
    return daySession;
  },
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
        draft.exercise = [];
        setSession(draft.sessions);
      }),
    ),
});

export const useGstore = create(gstore);

const globalKey = 'session';
// store.delete(globalKey);
const getSession = () => {
  if (store.contains(globalKey)) {
    return JSON.parse(store.getString(globalKey));
  } else {
    return [];
  }
};

const setSession = sessions => {
  store.set(globalKey, JSON.stringify(sessions));
};

useGstore.setState(() => ({sessions: getSession()}));
