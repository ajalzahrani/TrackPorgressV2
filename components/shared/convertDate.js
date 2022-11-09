const convertDate = dateObj => {
  var date = new Date(dateObj);
  var yr = date.getFullYear();
  var mo = date.getMonth() + 1;
  var day = date.getDate();

  return day + mo + yr;
};

export {convertDate};
