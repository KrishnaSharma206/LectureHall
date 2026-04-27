function generateRecurringDates(start, end, recurrence) {
  const dates = [];

  const startDate = new Date(start);
  const endDate = new Date(end);
  const until = new Date(recurrence.endDate);

  let current = new Date(startDate);

  while (current <= until) {
    if (recurrence.type === "daily") {
      dates.push(new Date(current));
      current.setDate(current.getDate() + recurrence.interval);
    }

    else if (recurrence.type === "weekly") {
      for (let day of recurrence.daysOfWeek) {
        const temp = new Date(current);
        temp.setDate(temp.getDate() + (day - temp.getDay()));

        if (temp >= startDate && temp <= until) {
          dates.push(new Date(temp));
        }
      }
      current.setDate(current.getDate() + 7 * recurrence.interval);
    }

    else {
      break;
    }
  }

  return dates;
}

module.exports = generateRecurringDates;