const secondsInADay = 86400;
const millisecondsInASecond = 1000;
const minutesInAnHour = 60;
const secondsInAMinute = 60;
const secondsInAnHour = minutesInAnHour * secondsInAMinute;
const millisecondsInAnHour = secondsInAnHour * millisecondsInASecond;
const millisecondsInAMinute = secondsInAMinute * millisecondsInASecond;

module.export.getPreviousDay = (date) => {
  const dateInSeconds = date.getTime() / millisecondsInASecond;
  const secondsAfterMidnightDate = dateInSeconds % secondsInADay;
  const midnightDate = dateInSeconds - secondsAfterMidnightDate;
  const previousDateTimestamp = midnightDate - secondsInADay;
  return new Date(previousDateTimestamp * millisecondsInASecond);
}

module.export.addHours = (date, hours) => {
  return new Date(date.getTime() + hours * millisecondsInAnHour);
}

module.export.addMinutes = (date, minutes) => {
  return new Date(date.getTime() + minutes * millisecondsInAnHour);
}
