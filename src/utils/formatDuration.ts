export const formatDuration = (
  time: number,
  formatMode: "minutes" | "seconds"
): string => {
  let daysLeft: number = 0;
  let hoursLeft: number = 0;
  let minutesLeft: number = 0;
  let secondsLeft: number = 0;

  if (formatMode === "minutes") {
    daysLeft = Math.floor(time / 1440);
    hoursLeft = Math.floor((time % 1440) / 60);
    minutesLeft = time % 60;
    secondsLeft = 0; // No seconds in "minutes" mode
  }

  if (formatMode === "seconds") {
    daysLeft = Math.floor(time / 86400);
    hoursLeft = Math.floor((time % 86400) / 3600);
    minutesLeft = Math.floor((time % 3600) / 60);
    secondsLeft = time % 60;
  }

  return `${Math.max(0, daysLeft)} days, ${Math.max(0, hoursLeft)} hours, ${Math.max(0, minutesLeft)} minutes, ${Math.max(0, secondsLeft)} seconds`;
};
