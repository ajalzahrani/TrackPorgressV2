export const getDayLabel = () => {
  var date = new Date();
  date.setDate(date.getDate() + 0); // add day
  return date.toLocaleDateString('en-us', {weekday: 'long'}); // get day name
};
