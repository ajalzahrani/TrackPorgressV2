import {store} from '../../Store';

import routines from './routines';
import workouts from './workouts';
import exercisesMaster from './exercisesMaster';
import weekdays from './weekdays';

export function ImplementDataStructure() {
  // store.delete('routines');
  // store.clearAll();
  routines[0].workouts = workouts;
  routines[0].weekdays = weekdays;

  if (!store.contains('exercises')) {
    store.set('exercises', JSON.stringify(exercisesMaster));
    console.log('Exercises data implemented successfully');
  }

  if (!store.contains('routines')) {
    store.set('routines', JSON.stringify(routines));
    console.log('Workouts data implemented successfully ');
  }
}
