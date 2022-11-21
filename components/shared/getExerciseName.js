import {store} from '../../Store';
const exerciseData = JSON.parse(store.getString('exercises'));

/* HOW TO QUERY EXERCISE NAME BY ID FROM EXERCISE LIST */
export const getExerciseName = id => {
  let exername = exerciseData.filter(element => {
    return element.id === id;
  });
  return exername[0]?.title;
};
