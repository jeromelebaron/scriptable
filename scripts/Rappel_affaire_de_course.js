// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
const EventLib = importModule('libs/event');
const CalendarLib = importModule('libs/calendar');
const ReminderLib = importModule('libs/reminder');

let runningCalendar = await Calendar.forEventsByTitle(CalendarLib.runningName);
let weekRunningCalendarEvents = await CalendarEvent.thisWeek([runningCalendar]);
let efWeekRunningCalendarEvents = extractEfWeekRunningCalendarEvents(weekRunningCalendarEvents);

let rappelCalendar = await Calendar.forRemindersByTitle(ReminderLib.rappelName);
efWeekRunningCalendarEvents.forEach(event => createReminder(event, rappelCalendar));

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
  let startDate = calendarEvent.startDate;
  return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1, 7, 30, 0, 0);
}
