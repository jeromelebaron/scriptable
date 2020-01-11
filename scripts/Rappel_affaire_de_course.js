// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
const runningCalendarName = 'Course a pied';
let runningCalendar = await Calendar.forEventsByTitle(runningCalendarName);
const efCalendarEventName = 'EF';
let weekRunningCalendarEvents = await CalendarEvent.thisWeek([runningCalendar]);
let efWeekRunningCalendarEvents = extractEfWeekRunningCalendarEvents(weekRunningCalendarEvents);

const rappelReminderName = 'Rappels';
let rappelCalendar = await Calendar.forRemindersByTitle(rappelReminderName);
efWeekRunningCalendarEvents.forEach(event => createReminder(event, rappelCalendar));

Script.complete();

function extractEfWeekRunningCalendarEvents(runningCalendarEvents) {
  return runningCalendarEvents
    .filter(event => isFuture(event))
    .filter(event => !isAllDay(event))
    .filter(event => isEventTitleIncludesEF(event));
}

function isFuture(event) {
  return event.startDate.getTime() > new Date().getTime();
}

function isAllDay(event) {
  return event.isAllDay;
}

function isEventTitleIncludesEF(event) {
  return event.title.includes(efCalendarEventName);
}

function createReminder(calendarEvent, reminderCalendar) {
  let newReminder = new Reminder();
  newReminder.title = 'Préparer les affaires de course';
  newReminder.calendar = reminderCalendar;
  newReminder.dueDate = createMorningDateDayBeforeFromCalendarEvent(calendarEvent);
  newReminder.save();
}

function createMorningDateDayBeforeFromCalendarEvent(calendarEvent) {
  let startDate = calendarEvent.startDate;
  return new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() - 1, 7, 30, 0, 0);
}
