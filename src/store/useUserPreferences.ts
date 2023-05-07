import create from 'zustand';
import {store} from './mmkv';
import moment from 'moment';
import produce, {Draft} from 'immer';
import uuidv4 from 'src/components/shared/uuid4v';
import def from 'src/components/shared/GlobalDefinition';
import {userType} from 'src/types';

const getPreferences = (): userType[] => {
  const preferencesString = store.getString(def.userPreferences);
  return store.contains(def.userPreferences) &&
    typeof preferencesString === 'string'
    ? JSON.parse(preferencesString)
    : [];
};

type State = {
  preferences: userType[];
};

type Actions = {};

const initialState: State = {
  preferences: getPreferences(),
};

const useSessionStore = create<State & Actions>((set, get) => ({
  ...initialState,
}));

export default useSessionStore;
