import React from 'react';

// Stack Navigator
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const StackNav = createNativeStackNavigator<ScheduleStackRootParamList>();

// Screens
import ScheduleScreen from '../screen/schedule/ScheduleScreen';
import WorkoutScreen from '../screen/workout/WorkoutScreen';
import ExerciseScreen from '../screen/exercise/ExerciseScreen';
import ActiveScreen from '../screen/active/ActiveScreen';
import VReportScreen from '../screen/sessionReport/VReportScreen';
import RoutineScreen from '../screen/routine/RoutineScreen';
import RoutineFormScreen from '../screen/routineForm/RoutineFormScreen';

export type ScheduleStackRootParamList = {
  ScheduleScreen: undefined;
  WorkoutScreen: undefined;
  ExerciseScreen: undefined;
  ActiveScreen: undefined;
  VReportScreen: undefined;
  RoutineScreen: undefined;
  RoutineFormScreen: undefined;
};

// use this for useNavigation hook
export type scheduleStackProp =
  NativeStackNavigationProp<ScheduleStackRootParamList>;

const ScheduleStack = () => {
  return (
    <StackNav.Navigator screenOptions={{headerShown: false}}>
      <StackNav.Screen name="RoutineScreen" component={RoutineScreen} />
      <StackNav.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <StackNav.Screen name="WorkoutScreen" component={WorkoutScreen} />
      <StackNav.Screen name="ActiveScreen" component={ActiveScreen} options />
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

export default ScheduleStack;
