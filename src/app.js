const sourceData = require('./data.csv');

const summaryData = sourceData.reduce(((accumulator, currentValue) => {
  // If the category exists in summary data object...
  if (accumulator.hasOwnProperty(currentValue.violation_category)) {
    // Get the category item
    const accumulatorItem = accumulator[currentValue.violation_category];

    // Increase the violation count
    accumulatorItem.violation_count = accumulatorItem.violation_count + 1;

    // If the violation data is earlier than the earliest violation date, update it with the current item's date
    // NOTE: Since dates are always ISO-8601 and no timezones, no need to convert to date object (yet)
    if (currentValue.violation_date < accumulatorItem.earliest_violation_date) {
      accumulatorItem.earliest_violation_date = currentValue.violation_date;
    }

    // If the violation data is later than the latest violation date, update it with the current item's date
    // NOTE: Since dates are always ISO-8601 and no timezones, no need to convert to date object (yet)
    if (currentValue.violation_date > accumulatorItem.latest_violation_date) {
      accumulatorItem.latest_violation_date = currentValue.violation_date;
    }
  }
  // If the category doesn't exist in the summary data object...
  else {
    // Create the category in the summary data object with the current item's data
    accumulator[currentValue.violation_category] = {
      violation_count: 1,
      earliest_violation_date: currentValue.violation_date,
      latest_violation_date: currentValue.violation_date,
    };
  }

  return accumulator;
}), {});

// Inject data into the table body
const tableEl = document.getElementById('table');
const tableBody = document.createElement('tbody');

// Populate tableBody with data rows
for (const category in summaryData) {
  const tableRow = document.createElement('tr');

  const tableRowHtml = `
    <td>${category}</td>
    <td>${summaryData[category].violation_count}</td>
    <td>${summaryData[category].earliest_violation_date}</td>
    <td>${summaryData[category].latest_violation_date}</td>
  `;

  tableRow.innerHTML = tableRowHtml;

  tableBody.appendChild(tableRow);
}

// Append tableBody into the table element
tableEl.appendChild(tableBody);
