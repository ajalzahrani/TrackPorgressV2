import useRoutineStore from 'src/store/useRoutineStore';

const useCurrentRoutine = () => {
  const routines = useRoutineStore(s => s.routines);

  const getCurrentRoutine = (routineId: string) => {
    const routine = routines.find(r => r.id === routineId);
    return routine ? routine : null;
  };

  return getCurrentRoutine;
};

export default useCurrentRoutine;
