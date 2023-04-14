import create from 'zustand';
import {store} from './mmkv';
import uuid from 'react-native-uuid';
import produce, {Draft} from 'immer';
import {
  sessionExerciseType,
  sessionType,
} from 'src/components/shared/globalTypes';
import uuidv4 from 'src/components/shared/uuid4v';
import moment from 'moment';

const sessionGlobalKey = 'session';

const getSession = (): sessionType[] => {
  const sessionString = store.getString(sessionGlobalKey);
  return store.contains(sessionGlobalKey) && typeof sessionString === 'string'
    ? JSON.parse(sessionString)
    : [];
};

type State = {
  sessions: sessionType[];
};

type Actions = {
  registerSet: (
    sessionId: string,
    exerciseId: string,
    weight: number,
    reps: number,
    tut: number,
  ) => void;
  registerSession: (
    sessionId: string,
    datetime: string,
    duration: string,
    startTime: string,
    endTime: string,
    workoutId: string,
    exercise?: sessionExerciseType[],
  ) => void;
  getSessionsByDate: (date: string) => sessionType[];
};

const initialState: State = {
  sessions: getSession(),
};

const useSessionStore = create<State & Actions>((set, get) => ({
  ...initialState,

  registerSet: (
    sessionId: string,
    exerciseId: string,
    weight: number,
    reps: number,
    tut: number,
  ) =>
    set(
      produce((state: Draft<State>) => {
        const session = state.sessions.find(s => s.sesisonId === sessionId);
        if (session) {
          const exercise = session.exercise.find(
            e => e.exerciseId === exerciseId,
          );
          if (exercise) {
            exercise.set.push({
              setId: uuidv4(),
              weight,
              reps,
              tut,
            });
          } else {
            session.exercise.push({
              exerciseId,
              set: [{setId: `${sessionId}-${exerciseId}-0`, weight, reps, tut}],
            });
          }
        }
      }),
    ),

  registerSession: (
    sessionId: string,
    datetime: string,
    duration: string,
    startTime: string,
    endTime: string,
    workoutId: string,
    exercise?: sessionExerciseType[],
  ) =>
    set(
      produce((state: Draft<State>) => {
        const sessionIndex = state.sessions.findIndex(
          s => s.sesisonId === sessionId,
        );
        if (sessionIndex !== -1) {
          state.sessions[sessionIndex].datetime = datetime;
          state.sessions[sessionIndex].duration = duration;
          state.sessions[sessionIndex].startTime = startTime;
          state.sessions[sessionIndex].endTime = endTime;
          state.sessions[sessionIndex].workoutId = workoutId;
        } else {
          if (exercise !== undefined) {
            state.sessions.push({
              sesisonId: sessionId,
              datetime: datetime,
              duration: duration,
              startTime: startTime,
              endTime: endTime,
              workoutId: workoutId,
              exercise: exercise,
            });
          }
          store.set(sessionGlobalKey, JSON.stringify(sessions));
        }
      }),
    ),

  getSessionsByDate: (date: string) => {
    let daySession = [];
    for (let i = 0; i < get().sessions.length; i++) {
      if (moment(get().sessions[i].datetime).format('YYYY-MM-DD') === date) {
        daySession.push(get().sessions[i]);
      }
    }
    return daySession;
  },
}));

export default useSessionStore;
