// Your code here
const createEmployeeRecord = (employee) =>{
    //This loads the employee array into its corresponding object properties
    employee = {
        firstName : employee[0],
        familyName : employee[1],
        title : employee[2],
        payPerHour : employee[3],
        timeInEvents : [],
        timeOutEvents : []
    }
    return employee;
}

function createEmployeeRecords(employeeRecords){
    //initialize an empty array to store new records
    const allEmployeeRecords = [];
    employeeRecords.map(record =>{
        allEmployeeRecords.push(createEmployeeRecord(record));
    });
    return allEmployeeRecords;
}

function createTimeInEvent(employeeRecord, dateStamp){
    //splitting the date into arrays that can be grabbed separately as hour and date
    const newDate = dateStamp.split(" ")
    const timeInEvent = {
        type: 'TimeIn',
        //date format is from yy,mm,dd,hh,mm,ss... thus date comes b4 hour
        //turns the hour into an integer that can be called
        hour: parseInt(newDate[1]),
        date: newDate[0],
    }
    employeeRecord.timeInEvents.push(timeInEvent)
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp){
    //splitting the date into arrays that can be grabbed separately as hour and date
    const newDate = dateStamp.split(" ")
    const timeOutEvent = {
        type: 'TimeOut',
        //date format is from yy,mm,dd,hh,mm,ss... thus date comes b4 hour
        //turns the hour into an integer that can be called
        hour: parseInt(newDate[1]),
        date: newDate[0],
    }
    employeeRecord.timeOutEvents.push(timeOutEvent)
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, date){
    //calls on the function findEventForDate
    const timeInEvent = findEventForDate(employeeRecord.timeInEvents, date);
    const timeOutEvent = findEventForDate(employeeRecord.timeOutEvents, date);
    const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
    return hoursWorked;
}

const findEventForDate = (timeEvents, date) => {
    //uses the find method to calculate
    const timeEvent = timeEvents.find(timeEvent => timeEvent.date === date);
    return timeEvent;
}

function wagesEarnedOnDate(employee, date) {
    //call the hoursWorkedOnDate and store it in a variable
    const hoursWorked = hoursWorkedOnDate(employee, date);
    //multiply the variable with the key of payPerHour in employee
    const wage = hoursWorked * employee.payPerHour;
    return wage;
}

function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(timeInEvent => timeInEvent.date);
    let allWages = 0;
    dates.forEach(date => {
        allWages = allWages + wagesEarnedOnDate(employee, date);
    });
    return allWages;
}

function calculatePayroll(employees) {
    let allWages = 0;
    employees.forEach(employee => {
        allWages = allWages + allWagesFor(employee);
    });
    return allWages;
}