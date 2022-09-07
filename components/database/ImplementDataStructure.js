import {store} from '../../Store';
import {WeekdaysStructure as wds} from './WeekdaysStructure';
import {ExerciseData} from './ExerciseData';

export function ImplementDataStructure() {
  // store.delete('Wednesday');
  wds.map(dayObj => {
    if (!store.contains(dayObj.day)) {
      store.set(dayObj.day, JSON.stringify(dayObj));
      console.log(dayObj.day, 'created.');
    }
  });

  if (!store.contains('exercises')) {
    store.set('exercises', JSON.stringify(ExerciseData));
    console.log('Exercises data implemented successfully');
  }

  console.log('Data Structure Implemented Successfully.');
}
