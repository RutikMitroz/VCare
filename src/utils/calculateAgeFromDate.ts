export const calculate_age = (dob: Date) => {
  const _dob = new Date(dob);

  var diff_ms = Date.now() - _dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};
