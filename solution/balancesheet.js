// let input;
// input = {
//     "expenseData": [
//         {
//             "amount": 20,
//             "startDate": "2021-02-01T00:00:00.000Z"
//         },
//         {
//             "amount": 30,
//             "startDate": "2021-03-01T00:00:00.000Z"
//         }
//     ],
//     "revenueData": [
//         {
//             "amount": 10,
//             "startDate": "2021-01-01T00:00:00.000Z"
//         },
//         {
//             "amount": 60,
//             "startDate": "2021-02-01T00:00:00.000Z"
//         }
//     ]
// }


const sortArray = (a, b) => {
    var key1 = a.startDate;
    var key2 = b.startDate;
    if (key1 < key2) {
        return -1;
    } else if (key1 == key2) {
        return 0;
    } else {
        return 1;
    }
}

const calculateData = (sheet, months, operate) => {
    for (let month of months) {
        if (!sheet[month.startDate]) {
            sheet[month.startDate] = { amount: 0, startDate: month.startDate }
        }
        if (typeof month.amount == "string") {
            month.amount = parseFloat(month.amount);
        }
        if (month.amount == null || month == undefined || isNaN(month.amount)) {
            month.amount = 0
        }
        sheet[month.startDate] = operate == "+" ? { amount: sheet[month.startDate].amount + month.amount, startDate: month.startDate } : { amount: sheet[month.startDate].amount - month.amount, startDate: month.startDate }
    }
    return sheet;
}

const generateSheet = (input = { expenseData: [], revenueData: [] }) => {
    // console.log("generate sheet ", input);
    if (!input.expenseData && !input.revenueData) {
        console.log('Please provide a proper json');
        return;
    }
    let sheet = {};
    sheet = calculateData(sheet, input.revenueData, '+');
    sheet = calculateData(sheet, input.expenseData, '-');
    let balance = { balance: [] };
    for (let data of Object.keys(sheet)) {
        balance.balance.push(sheet[data]);
    }
    // console.log("BALACNE SHEET", balance);
    balance.balance.sort(sortArray);
    // console.log("Sorted BALACNE SHEET", JSON.stringify(balance));
    return (balance)
}

// console.log(generateSheet(input));