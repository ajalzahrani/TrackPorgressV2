import create from 'zustand';
import {store} from './mmkv';
import uuid from 'react-native-uuid';
import produce, {Draft} from 'immer';
import {sessionType} from 'src/components/shared/globalTypes';

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
  registerSession: (session: sessionType) => void;
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
        store.set(sessionGlobalKey, JSON.stringify(sessions));
      }),
    ),
}));

export default useSessionStore;
