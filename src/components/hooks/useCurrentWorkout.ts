import useCurrentRoutine from './useCurrentRoutine';

const useCurrentWorkout = () => {
  const getCurrentRoutine = useCurrentRoutine();

  const getCurrentWorkout = (routineId: string, workoutId: string) => {
    const workout = getCurrentRoutine(routineId)?.workouts.find(
      w => w.id === workoutId,
    );

    return workout ? workout : null;
  };

  return getCurrentWorkout;
};

export default useCurrentWorkout;
