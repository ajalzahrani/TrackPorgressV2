import {useEffect, useMemo, useState} from 'react';
import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';
import {cvtCmtoMeter, cvtMeterToInch} from 'src/utility/unitconversion';

export default function useBMICas() {
  const bm = useUserBodyMeasureStore(s => s.bodyMeasurements);
  const setBmi = useUserBodyMeasureStore(s => s.setBmi);

  useEffect(() => {
    if (bm.weight !== undefined && bm.height !== undefined) {
      if (bm.metric == 'kg') {
        const heightInMeter = cvtCmtoMeter(parseInt(bm.height));
        console.log('heightInMeter', heightInMeter);
        // const bmi = weight / (height * height);
        const newBmi = parseInt(bm.weight) / Math.pow(heightInMeter, 2);
        console.log('bmi: ', newBmi);

        setBmi(newBmi.toFixed(1));
      } else {
        const heightInInche = cvtMeterToInch(cvtCmtoMeter(parseInt(bm.height)));
        console.log('heightInInche', heightInInche);

        const newBmi = (parseInt(bm.weight) / Math.pow(heightInInche, 2)) * 703;
        console.log('bmi: ', newBmi);
        setBmi(newBmi.toFixed(1));
      }
    }
  }, [bm.weight, bm.height]);
  // console.log('bmi', bm.bmi);
  // console.log('metric system in UseBMI', bm.metric);
  // console.log('height in useBMI', bm.height);
  // console.log('weight in useBMI', bm.weight);
}
