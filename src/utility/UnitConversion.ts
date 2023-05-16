import useUserBodyMeasureStore from 'src/store/useUserBodyMeasureStore';

export default function useUnit() {
  const bodyMeasurements = useUserBodyMeasureStore(s => s.bodyMeasurements);

  const convertWeight = (weight: string | undefined) => {
    if (weight !== undefined) {
      let flotweight = parseFloat(weight);

      if (bodyMeasurements.metric === 'kg') {
        flotweight = flotweight / 2.40462;
      } else {
        flotweight = flotweight * 2.40462;
      }

      return flotweight.toFixed(2) + bodyMeasurements.metric;
    }
  };

  return convertWeight;
}
