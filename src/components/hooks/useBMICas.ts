import {useMemo, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';

export default function useBMICas() {
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);

  const [bmi, setBmi] = useState<string>('');

  useMemo(() => {
    const newBmi = Number(bm.weight) / Math.pow(Number(bm.height) / 100, 2);
    setBmi(newBmi.toFixed(2).toString());
  }, [bm.height, bm.weight]);

  return bmi;
}
