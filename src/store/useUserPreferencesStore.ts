import create from 'zustand';
import {store} from './mmkv';
import moment from 'moment';
import produce, {Draft} from 'immer';
import uuidv4 from 'src/components/shared/uuid4v';
import def from 'src/components/shared/GlobalDefinition';
import {userType} from 'src/types';

const getPreferences = (): userType => {
  const preferencesString = store.getString(def.userPreferences);
  return store.contains(def.userPreferences) &&
    typeof preferencesString === 'string'
    ? JSON.parse(preferencesString)
    : [];
};

type State = {
  preferences: userType;
};

type Actions = {
  setUsername: (username: string) => void;
  setFirstName: (firstname: string) => void;
  setLastName: (lastname: string) => void;
  setDOB: (dob: string) => void;
  setMobile: (mobile: string) => void;
  setEmail: (email: string) => void;
  setLocation: (location: string) => void;
  setGender: (gender: string) => void;
};

const initialState: State = {
  preferences: getPreferences(),
};

const useUserPreferencesStore = create<State & Actions>((set, get) => ({
  ...initialState,

  setUsername: username =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.username = username;
      }),
    ),
  setFirstName: firstname =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.firstname = firstname;
      }),
    ),
  setLastName: lastname =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.lastname = lastname;
      }),
    ),
  setMobile: mobile =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.mobile = mobile;
      }),
    ),
  setDOB: dob =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.dob = dob;
      }),
    ),
  setEmail: email =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.email = email;
      }),
    ),
  setLocation: location =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.location = location;
      }),
    ),
  setGender: gender =>
    set(
      produce((state: Draft<State>) => {
        state.preferences.gender = gender;
      }),
    ),
}));

export default useUserPreferencesStore;
