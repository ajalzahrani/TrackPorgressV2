import {useMemo, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';

export default function useBMICas() {
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setBmi = useUserBodyMeasureStore(s => s.setBmi);

  useMemo(() => {
    if (bm.weight !== undefined && bm.height !== undefined) {
      if (bm.metric == 'kg') {
        const newBmi =
          parseFloat(bm.weight) /
          (parseFloat(bm.height) * parseFloat(bm.height));
        setBmi(newBmi.toFixed(1));
      } else {
        const newBmi =
          parseFloat(bm.weight) /
          (parseFloat(bm.height) * parseFloat(bm.height) * 703);
        setBmi(newBmi.toFixed(1));
      }
    }

    console.log('bmi : ', bm.bmi);
  }, [bm.height, bm.weight]);
}
