import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';

export default function useUnit() {
  const bodyMeasurements = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setWeight = useUserBodyMeasureStore(s => s.setWeight);
  const setHeight = useUserBodyMeasureStore(s => s.setHeight);

  const firstUpdate = useRef(true);
  const convertWeight = () => {
    console.log('convert ran');
    if (bodyMeasurements.weight !== undefined) {
      let flotweight = parseFloat(bodyMeasurements.weight);
      if (bodyMeasurements.metric === 'kg') {
        console.log(`metric is KG`);
        console.log(`weight = ${flotweight / 2.40462}`);
        flotweight = flotweight / 2.205;
      } else {
        console.log(`metric is LBS`);
        console.log(`weight = ${flotweight * 2.40462}`);
        flotweight = flotweight * 2.205;
      }
      const result = flotweight.toFixed(2) + bodyMeasurements.metric;
      setWeight(result);
    }
  };

  const convertHeight = () => {
    if (bodyMeasurements.height !== undefined) {
      let flotHeight = parseFloat(bodyMeasurements.height);
      if (bodyMeasurements.metric == 'kg') {
        flotHeight = flotHeight * 30.48;
      } else {
        flotHeight = flotHeight / 30.48;
      }
      const result = flotHeight.toFixed(2);
      //+ bodyMeasurements.metric === 'kg' ? 'cm' : 'ft';
      setHeight(result);
    }
  };

  useLayoutEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    convertWeight();
    convertHeight();
  }, [bodyMeasurements.metric]);
}
