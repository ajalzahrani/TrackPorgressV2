// Height: metric => cm | imperial => foot
// Weight: metric => kg | imperial => lb

function cvtMeterToCm(m: number) {
  return m * 100;
}

function cvtCmtoMeter(m: number) {
  return m / 100;
}

function cvtCmToFoot(cm: number) {
  let heightMeter = cvtCmtoMeter(cm);
  return heightMeter * 0.032808399;
}

function cvtFootToCm(foot: number) {
  let heightMeter = foot / 0.032808399;
  return cvtMeterToCm(heightMeter);
}

function cvtKgToLb(kg: number) {
  return kg * 2.205;
}

function cvtLbToKg(lb: number) {
  return lb / 2.205;
}

export function convertWeight(weight: string, sys: string) {
  let w = parseFloat(weight);
  if (sys === 'imperial') {
    return cvtKgToLb(w);
  } else {
    return cvtLbToKg(w);
  }
}

export function convertHeight(height: string, sys: string) {
  const h = parseFloat(height);
  if (sys === 'imperial') {
    return cvtCmToFoot(h);
  } else {
    return cvtFootToCm(h);
  }
}
