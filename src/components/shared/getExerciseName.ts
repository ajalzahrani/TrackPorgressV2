import useExerciseStore from 'src/store/useExerciseMaster';

export const getExerciseName = (exerciseId: string) => {
  const exerciseMaster = useExerciseStore(s => s.exerciseMaster);
  let exername = exerciseMaster.filter(element => {
    return element.id === exerciseId;
  });
  return exername[0]?.name;
};
