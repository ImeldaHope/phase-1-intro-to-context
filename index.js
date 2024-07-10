// Your code here


function createEmployeeRecord(arr){
    return {
        firstName : arr[0],
        familyName : arr[1],
        title : arr[2],
        payPerHour : arr[3],
        timeInEvents : [],
        timeOutEvents : [],
    }
}

function createEmployeeRecords(employeesArray) {
    return employeesArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, timeAndDate){
    const [date, hour] = timeAndDate.split(' ');

    employeeRecord.timeInEvents.push(
        {
            type: "TimeIn",
            date : date,
            hour: parseInt(hour,10)
        }
    )
    
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, timeAndDate){
    const [date, hour] = timeAndDate.split(' ');

    employeeRecord.timeOutEvents.push(
        {
            type: "TimeOut",
            date: date,
            hour: parseInt(hour,10)
        }
    )

    return employeeRecord;
}

function hoursWorkedOnDate(record, dateOfWork){
    const timeInEvent = record.timeInEvents.find(emp => emp.date === dateOfWork);
    const timeOutEvent = record.timeOutEvents.find(emp => emp.date === dateOfWork);

    if (timeInEvent && timeOutEvent) {        
        const hoursWorked = (timeOutEvent.hour - timeInEvent.hour) / 100;
        return hoursWorked;
    } else {        
        return 'record not found';
    }
}

function wagesEarnedOnDate(record,date){
    return hoursWorkedOnDate (record,date) * record.payPerHour;
}

function allWagesFor(record){
    const payDates = record.timeInEvents.map(emp => emp.date);
    const employeePayments = payDates.reduce((tots, date) =>{
        return tots + wagesEarnedOnDate(record,date)
    }, 0);

    return employeePayments;
}

function calculatePayroll(employeesRecords){
    return employeesRecords.reduce((tots, employeesRecords) => {
        return tots + allWagesFor(employeesRecords)
    }, 0)
}