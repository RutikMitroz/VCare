import { format } from "date-fns";

export const getDateTime = (inputDate) => {
  const currentDateTimeObj = new Date(inputDate);

  const hours = currentDateTimeObj.getHours();
  const minutes = currentDateTimeObj.getMinutes();

  const currentTime24h = `${hours.toString().length === 2 ? "" : 0}${hours}:${
    minutes.toString().length === 2 ? "" : 0
  }${minutes}`;

  return {
    currentTime24h,
    currentTime12h: convertTime24hto12h(currentTime24h),
  };
};

export const addDaysToDate = (inputDate, noOfDays = 1) => {
  const newDate = new Date(inputDate);
  newDate.setDate(newDate.getDate() + noOfDays);
  return newDate;
};

// Returns true if startTimeInMins < endTimeInMins
function getTimeAsNumberOfMinutes(time) {
  const timeParts = time.split(":");

  const timeInMinutes = parseInt(timeParts[0] * 60 + timeParts[1]);

  return timeInMinutes;
}

export const compareTime = (startTime, endTime) => {
  const startTimeInMins = getTimeAsNumberOfMinutes(startTime);
  const endTimeInMins = getTimeAsNumberOfMinutes(endTime);

  return startTimeInMins < endTimeInMins;
};

export const getCurrentDateTime = (inputDate = new Date()) => {
  const currentDateTimeObj = inputDate;

  const month = currentDateTimeObj.getMonth() + 1;
  const year = currentDateTimeObj.getFullYear();
  const date = currentDateTimeObj.getDate();
  const hours = currentDateTimeObj.getHours();
  const minutes = currentDateTimeObj.getMinutes();

  const currentDate = `${year}-${month.toString().length === 2 ? "" : 0}${month}-${
    date.toString().length === 2 ? "" : 0
  }${date}`;

  const currentTime24h = `${hours.toString().length === 2 ? "" : 0}${hours}:${
    minutes.toString().length === 2 ? "" : 0
  }${minutes}`;

  return { currentDate, currentTime24h };
};

export const calculate_age = (dob) => {
  if (!dob) return;

  const _dob = new Date(dob);

  var diff_ms = Date.now() - _dob.getTime();
  var age_dt = new Date(diff_ms);

  return Math.abs(age_dt.getUTCFullYear() - 1970);
};

export const convertTime24hto12h = (time) => {
  // Check correct time format and split into components
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    // If time format correct
    time = time.slice(1); // Remove full string match value
    time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
    time[0] = +time[0] % 12 || 12; // Adjust hours
  }

  return time.join(""); // return adjusted time or original string
};

export const convertTime12to24 = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") hours = "00";

  if (modifier === "PM") hours = parseInt(hours, 10) + 12;

  return `${hours}:${minutes}`;
};

export const getDay = (date, lowercase = true) => {
  let dateAdv = new Date(date);
  let dayNo = dateAdv.getDay();
  let day;

  if (dayNo === 0) day = "Sunday";
  else if (dayNo === 1) day = "Monday";
  else if (dayNo === 2) day = "Tuesday";
  else if (dayNo === 3) day = "Wednesday";
  else if (dayNo === 4) day = "Thursday";
  else if (dayNo === 5) day = "Friday";
  else day = "Saturday";

  return lowercase ? day.toLowerCase() : day;
};

export const formatDateToTime = (date, mode = "HH:mm") =>
  format(new Date(date), mode);
