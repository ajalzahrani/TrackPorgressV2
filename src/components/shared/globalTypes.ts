export type sessionExerciseType = {
  exerciseId: string;
  set: {
    setId: string;
    weight: number;
    reps: number;
    tut: number;
  }[];
};
export type sessionType = {
  sesisonId: string;
  datetime: string;
  duration: string;
  startTime: string;
  endTime: string;
  workoutId: string;
  exercise: sessionExerciseType[];
};
export type userType = {
  // user identity
  id: string;
  username: string;
  password: string;
  firstname?: string;
  lastname?: string;

  // user personal
  dob?: string;
  tall?: number;
  weight?: number;

  // user contact
  mobile?: string;
  email: string;
  location?: {
    country: string;
    city: string;
  };
};
export type exerciseMasterType = {
  id: string;
  bodyPart?: string;
  equipment?: string;
  gifUrl?: string;
  name: string;
  target?: string;
};
export type weekdaysType = {
  id: number;
  symbol: string;
  workday: boolean;
  workout: string;
};
export type exercisesType = {
  id: string;
  freq: number[];
};
export type workoutType = {
  id: string;
  title: string;
  exercises: exercisesType[];
  resttime: number[];
};
export type routineType = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  level: number;
  description: string;
  workouts: workoutType[];
  weekdays: weekdaysType[];
};
