// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: pink; icon-glyph: magic;
const rappelReminderName = 'Rappels';
let rappelCalendar = await Calendar.forRemindersByTitle(rappelReminderName);
let todayReminders = await Reminder.allDueToday([rappelCalendar]);
let todayBaguetteReminder = findFirstReminder(todayReminders, isBaguetteReminder);
if (todayBaguetteReminder) {
  makeReminderAsCompleted(todayBaguetteReminder);
  todayBaguetteReminder.save();
}

Script.complete();

function findFirstReminder(reminders, fn) {
  return reminders.find(fn);
}

function isBaguetteReminder(reminder) {
  return reminder.title === 'Acheter une baguette';
}

function makeReminderAsCompleted(reminder) {
  reminder.isCompleted = true;
}