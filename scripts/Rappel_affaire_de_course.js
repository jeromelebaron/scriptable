// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
const EventLib = importModule('libs/event');
const CalendarLib = importModule('libs/calendar');
const ReminderLib = importModule('libs/reminder');
const DateLib = importModule('libs/date');

const sevenAM = 7;
const thirtyMinutes = 30;

let runningCalendar = await Calendar.forEventsByTitle(CalendarLib.runningName);
let weekRunningCalendarEvents = await CalendarEvent.thisWeek([runningCalendar]);
let efWeekRunningCalendarEvents = extractEfWeekRunningCalendarEvents(weekRunningCalendarEvents);

let rappelCalendar = await Calendar.forRemindersByTitle(ReminderLib.rappelName);
efWeekRunningCalendarEvents.forEach(event => createReminder(event, rappelCalendar));
createFridayReminder(rappelCalendar);

Script.complete();

function extractEfWeekRunningCalendarEvents(runningCalendarEvents) {
  return runningCalendarEvents
    .filter(event => EventLib.isFuture(event))
    .filter(event => !EventLib.isAllDay(event))
    .filter(event => EventLib.isTitleIncludes(event, EventLib.efName));
}

function createReminder(calendarEvent, reminderCalendar) {
  let newReminder = new Reminder();
  newReminder.title = 'Préparer les affaires de course';
  newReminder.notes = `- serviette
- gant
- gel douche
- sous vêtements de rechange
- pantalon
- veste
- teeshirt`;
  newReminder.calendar = reminderCalendar;
  newReminder.dueDate = createMorningDateDayBeforeFromCalendarEvent(calendarEvent);
  newReminder.save();
}

function createMorningDateDayBeforeFromCalendarEvent(calendarEvent) {
  const startDate = calendarEvent.startDate;
  const previousDay = DateLib.getPreviousDay(startDate);
  const previousDayAtSevenAM = DateLib.addHours(previousDay, sevenAM);
  return DateLib.addMinutes(previousDayAtSevenAM, thirtyMinutes);
}

function createFridayReminder(reminderCalendar) {
  let newReminder = new Reminder();
  newReminder.title = 'Ramener les affaires à laver';
  newReminder.notes = `- serviette
- gant`;
  newReminder.calendar = reminderCalendar;
  newReminder.dueDate = null;
  newReminder.save();
}
