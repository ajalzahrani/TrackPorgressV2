import {store} from '../../Store';

export const getWorkoutObject = id => {
  const workouts = JSON.parse(store.getString('workouts'));
  // console.log('requested ID: ', id);
  // console.log(workouts);
  let workout = {};
  for (let i = 0; i < workouts.length; i++) {
    // console.log(workouts[i]);
    // console.log(i);
    if (workouts[i].id === id) {
      workout = workouts[i];
      // console.log('workout object from function', workout);
      break;
    }
  }
  return workout;
};
