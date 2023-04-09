import create from 'zustand';
import {store} from '../mmkv';
import uuid from 'react-native-uuid';
import produce, {Draft} from 'immer';
import {sessionType} from 'src/components/shared/globalTypes';

const globalKey = 'session';

const getSession = (): sessionType[] => {
  const sessionString = store.getString(globalKey);
  return store.contains(globalKey) && typeof sessionString === 'string'
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
  registerSession: (session: sessionType) => void;
};

const initialState: State = {
  sessions: getSession(),
};

const useWorkoutSessionStore = create<State & Actions>((set, get) => ({
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
        const session = state.sessions.find(s => s.id === sessionId);
        if (session) {
          const exercise = session.exercise.find(
            e => e.exerciseId === exerciseId,
          );
          if (exercise) {
            exercise.set.push({
              setId: `${sessionId}-${exerciseId}-${exercise.set.length}`,
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

  registerSession: (session: sessionType) =>
    set(
      produce((state: Draft<State>) => {
        state.sessions.push(session);
        setSession(state.sessions);
      }),
    ),
}));

const setSession = (sessions: sessionType[]) => {
  store.set(globalKey, JSON.stringify(sessions));
};

export default useWorkoutSessionStore;
