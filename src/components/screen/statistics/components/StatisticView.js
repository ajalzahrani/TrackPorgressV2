import {View, Text} from 'react-native';
import React, {useMemo} from 'react';
import {useGstore} from '../../gstore';
import {getExerciseName} from '../shared';

const StatisticView = () => {
  const sessions = useGstore(state => state.sessions);

  const exs = [];
  const findIndex = ind => {
    for (let i = 0; i < exs.length; i++) {
      if (exs[i].id == ind) {
        return i;
      }
    }
    return -1;
  };

  const exerciseCounts = useMemo(() => {
    for (let i = 0; i < sessions.length; i++) {
      for (let j = 0; j < sessions[i].exercises.length; j++) {
        const id = sessions[i].exercises[j].exerciseID;
        const index = findIndex(id);
        if (index === -1) {
          exs.push({id: id, value: 1});
        } else {
          exs[index].value += 1;
        }
      }
    }
    return exs;
  }, [sessions]);

  return (
    <View style={{padding: 20}}>
      <Text style={{color: 'white'}}>Sessions: {sessions.length}</Text>
      <Text style={{color: 'white'}}>
        Exercies:{' '}
        {sessions.reduce((acc, cur) => acc + cur?.exercises.length, 0)}
      </Text>
      {exerciseCounts.map((v, i) => {
        return (
          <Text style={{color: 'white'}} key={i}>
            {getExerciseName(v.id)}: {v.value}
          </Text>
        );
      })}
    </View>
  );
};

export default StatisticView;
