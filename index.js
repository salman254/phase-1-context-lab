// Function to create an employee record from an array
function createEmployeeRecord(array) {
    return {
      firstName: array[0],
      familyName: array[1],
      title: array[2],
      payPerHour: array[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  // Function to create an array of employee records from an array of arrays
  function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(createEmployeeRecord);
  }
  
  // Function to add a timeIn event to an employee's record
  function createTimeInEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeInEvent = {
      type: "TimeIn",
      date,
      hour: parseInt(hour, 10)
    };
    this.timeInEvents.push(timeInEvent);
    return this;
  }
  
  // Function to add a timeOut event to an employee's record
  function createTimeOutEvent(dateTime) {
    const [date, hour] = dateTime.split(' ');
    const timeOutEvent = {
      type: "TimeOut",
      date,
      hour: parseInt(hour, 10)
    };
    this.timeOutEvents.push(timeOutEvent);
    return this;
  }
  
  // Function to calculate the hours worked on a specific date
  function hoursWorkedOnDate(date) {
    const timeInEvent = this.timeInEvents.find(event => event.date === date);
    const timeOutEvent = this.timeOutEvents.find(event => event.date === date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
  }
  
  // Function to calculate the wages earned on a specific date
  function wagesEarnedOnDate(date) {
    const hoursWorked = hoursWorkedOnDate.call(this, date);
    const wage = this.payPerHour * hoursWorked;
    return wage;
  }
  
  // Function to find the total wages for all dates worked by an employee
  function allWagesFor() {
    const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date;
    });
  
    const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this), 0);
  
    return payable;
  }
  
  // Function to find an employee by their first name
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  // Function to calculate the total payroll for all employees
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce(function (total, record) {
      return total + allWagesFor.call(record);
    }, 0);
  }
  
  