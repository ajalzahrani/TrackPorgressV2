import {store} from '../../Store';

export const getDayObject = () => {
  var date = new Date();
  date.setDate(date.getDate() + 0); // add day
  const todayName = date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name
  // console.log('Workout Screen: ', todayName);
  const dayObject = JSON.parse(store.getString(todayName));

  return dayObject;
};
