import {store} from '../../Store';
import {getDayLabel} from './getDayLabel';

export const getDayObject = () => {
  const todayName = getDayLabel();
  // console.log('Workout Screen: ', todayName);
  const dayObject = JSON.parse(store.getString(todayName));

  return dayObject;
};
