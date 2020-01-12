module.exports.isFuture = (event) => {
  return event.startDate.getTime() > new Date().getTime();
}

module.exports.isAllDay = (event) => {
  return event.isAllDay;
}

module.exports.isTitleIncludes = (event, query) => {
  return event.title.includes(query);
}

module.exports.efName = 'EF';
