import {routineType, workoutType, exercisesType} from '../../types';

function getObjectById<T>(id: string | number, array: T[]) {
  const objectIndex = array.findIndex(o => o.id === id);

  if (objectIndex === -1) {
    return array[objectIndex];
  }

  return undefined;
}

export default getObjectById;
