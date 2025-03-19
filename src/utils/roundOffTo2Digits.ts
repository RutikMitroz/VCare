const roundOffTo2Digits = (value: number): number =>
    Math.round((value + Number.EPSILON) * 100) / 100;
  
  export default roundOffTo2Digits;
  