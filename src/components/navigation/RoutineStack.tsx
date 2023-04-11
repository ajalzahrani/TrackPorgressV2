import React from 'react';

// Stack Navigator
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const StackNav = createNativeStackNavigator<RoutineStackRootParamList>();

// Screens
import RoutineListScreen from '../screen/routineList/RoutineListScreen';
import RoutineFormScreen from '../screen/routineForm/RoutineFormScreen';
import RoutineScreen from '../screen/routine/RoutineScreen';
import WorkoutScreen from '../screen/workout/WorkoutScreen';
import ExerciseScreen from '../screen/exercise/ExerciseScreen';
import SessionScreen from '../screen/session/SessionScreen';
import VReportScreen from '../screen/sessionReport/VReportScreen';
import {routineType, workoutType} from '../shared/globalTypes';

export type RoutineStackRootParamList = {
  RoutineListScreen: {name: string};
  RoutineFormScreen: {routine: routineType};
  RoutineScreen: {routine: routineType};
  WorkoutScreen: {routineId: string; workout: workoutType | undefined};
  ExerciseScreen: {exercises: {id: string; freq: number[]}[]};
  SessionScreen: undefined;
  VReportScreen: undefined;
};

// use this for useNavigation hook
export type routineStackProp =
  NativeStackNavigationProp<RoutineStackRootParamList>;

const RoutineStack = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="RoutineListScreen" component={RoutineListScreen} />
      <StackNav.Screen name="RoutineScreen" component={RoutineScreen} />
      <StackNav.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <StackNav.Screen name="SessionScreen" component={SessionScreen} />
      <StackNav.Screen
        name="ExerciseScreen"
        component={ExerciseScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
      <StackNav.Screen
        name="VReportScreen"
        component={VReportScreen}
        options={{
          presentation: 'fullScreenModal',
          headerShown: false,
        }}
      />
      <StackNav.Screen
        name="RoutineFormScreen"
        component={RoutineFormScreen}
        options={{
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </StackNav.Navigator>
  );
};

export default RoutineStack;
