// import useExerciseStore from 'src/store/useExerciseMaster';
import {store} from 'src/store/mmkv';

export const getExerciseName = (exerciseId: string) => {
  return '';
  // // const exerciseMaster = useExerciseStore(s => s.exerciseMaster);
  // let exerciseString = store.getString('exercises');
  // if (exerciseString !== undefined) {
  //   const exerciseMaster = JSON.parse(exerciseString);
  //   if (exerciseMaster !== undefined) {
  //     let exername = exerciseMaster.filter(exercise => {
  //       return exercise.id === exerciseId;
  //     });
  //     return exername[0]?.name;
  //   }
  // }
  // return '';
};
