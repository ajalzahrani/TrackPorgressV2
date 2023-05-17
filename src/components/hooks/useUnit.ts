import {useEffect, useLayoutEffect, useRef, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import useBMICas from './useBMICas';

// Metric system or the International System of Units (SI). In this system, the unit of weight or mass is the kilogram (kg).

// Imperial system or the United States customary units. In this system, the unit of weight or mass is the pound (lb).

export default function useUnit() {
  const bodyMeasurements = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setWeight = useUserBodyMeasureStore(s => s.setWeight);
  const setHeight = useUserBodyMeasureStore(s => s.setHeight);

  const firstUpdate = useRef(true);
  const convertWeight = () => {
    if (bodyMeasurements.weight !== undefined) {
      let flotweight = parseFloat(bodyMeasurements.weight);
      if (bodyMeasurements.metric === 'kg') {
        flotweight = flotweight / 2.205;
      } else {
        flotweight = flotweight * 2.205;
      }
      const result = flotweight.toFixed(1);
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
      const result = flotHeight.toFixed(1);
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
