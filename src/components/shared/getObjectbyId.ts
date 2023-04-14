import {routineType, workoutType, exercisesType} from './globalTypes';

const getObjectById = (
  id: string,
  array: routineType[] | workoutType[] | exercisesType[],
) => {
  const index = array.findIndex(i => i.id === id);
  return array[index];
};

export default getObjectById;
