'use strict';

// EasyBANK APP

// Data
const account1 = {
	owner: 'Jonas Schmedtmann',
	movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
	interestRate: 1.2, // %
	pin: 1111,
	movementsDates: [
		"2022-01-18T21:31:17.178Z",
		"2022-02-23T07:42:02.383Z",
		"2022-03-28T09:15:04.904Z",
		"2022-04-01T10:17:24.185Z",
		"2022-05-08T14:11:59.604Z",
		"2022-07-26T17:01:17.194Z",
		"2022-07-28T23:36:17.929Z",
		"2022-07-29T10:51:36.790Z",
	],
};

const account2 = {
	owner: 'Jessica Davis',
	movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
	interestRate: 1.5,
	pin: 2222,
	movementsDates: [
		"2022-01-18T21:31:17.178Z",
		"2022-02-23T07:42:02.383Z",
		"2022-03-28T09:15:04.904Z",
		"2022-04-01T10:17:24.185Z",
		"2022-05-08T14:11:59.604Z",
		"2022-07-26T17:01:17.194Z",
		"2022-07-28T23:36:17.929Z",
		"2022-07-29T10:51:36.790Z",
	],
};

const account3 = {
	owner: 'Steven Thomas Williams',
	movements: [200, -200, 340, -300, -20, 50, 400, -460],
	interestRate: 0.7,
	pin: 3333,
	movementsDates: [
		"2022-01-18T21:31:17.178Z",
		"2022-02-23T07:42:02.383Z",
		"2022-03-28T09:15:04.904Z",
		"2022-04-01T10:17:24.185Z",
		"2022-05-08T14:11:59.604Z",
		"2022-07-26T17:01:17.194Z",
		"2022-07-28T23:36:17.929Z",
		"2022-07-29T10:51:36.790Z",
	],
};

const account4 = {
	owner: 'Sarah Smith',
	movements: [430, 1000, 700, 50, 90],
	interestRate: 1,
	pin: 4444,
	movementsDates: [
		"2022-01-18T21:31:17.178Z",
		"2022-02-23T07:42:02.383Z",
		"2022-03-28T09:15:04.904Z",
		"2022-04-01T10:17:24.185Z",
		"2022-05-08T14:11:59.604Z",
		"2022-07-26T17:01:17.194Z",
		"2022-07-28T23:36:17.929Z",
		"2022-07-29T10:51:36.790Z",
	],
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const currencies = new Map([
	['USD', 'United States dollar'],
	['EUR', 'Euro'],
	['GBP', 'Pound sterling'],
]);
//Movement date

const formatMovementDate=function(date){
    const calcDaysPassed=(date1,date2)=>Math.round(Math.abs(date2-date1)/(1000*60*60*24));

    const daysPassed= calcDaysPassed(new Date(),date);
    console.log(daysPassed);

    if (daysPassed===0) return 'Today';
    if (daysPassed===1) return 'Yesterday';
    if (daysPassed<=7) return `${daysPassed} days ago`;
    const day = `${date.getDate()}`.padStart(2, 0)
    const month = `${date.getMonth()+1}`.padStart(2, 0)
    const year = date.getFullYear();
      return `${day}/${month}/${year}`;
  }


//Display Movements
const displayMovements = function(acc, sort = false) {
	containerMovements.innerHTML = "";

	const movs = sort ? acc.movements.slice().sort((a, b) => a - b) : acc.movements;

	movs.forEach(function(mov, i) {

		const type = mov > 0 ? 'deposit' : 'withdrawal';
		const date = new Date(acc.movementsDates[i]);
		const displayDate=formatMovementDate(date);


		const html = `<div class="movements__row">
  <div class="movements__type movements__type--${type}">
    ${i+1} ${type}
  </div>
  <div class="movements__date">${displayDate}</div>
  <div class="movements__value">${mov}₹</div>
</div>`;

		containerMovements.insertAdjacentHTML('afterbegin', html);
	});
}
//displayMovements(account1.movements);

//  Display Balance
const calcDisplayBalance = function(acc) {
	const balance = acc.movements.reduce((accu, mov) =>
		accu + mov, 0);
	acc.balance = balance;
	labelBalance.textContent = `${acc.balance}₹`;
}
//calcDisplayBalance(account1.movements); 

// Calc Display summary

const calcDisplaySummary = function(acc) {
	const incomes = acc.movements.filter(mov => mov > 0).reduce((acc, mov) => acc + mov, 0);
	labelSumIn.textContent = `${incomes}₹`;

	const out = acc.movements.filter(mov => mov < 0).reduce((acc, mov) => acc + mov, 0);
	labelSumOut.textContent = `${Math.abs(out)}₹`;

	const interest = acc.movements.filter(mov => mov > 0).map(deposit => (deposit * acc.interestRate) / 100).reduce((acc, int) => acc + int, 0);

	//interest with fixed decimal place 
	labelSumInterest.textContent = `${interest.toFixed(2)}₹`;

}
//calcDisplaySummary(account1.movements)


// creating username
const createUsernames = accs => {
	accs.forEach(function(acc) {
		acc.username = acc.owner.toLowerCase().split(' ').map(name => name[0]).join('');
	})
}
createUsernames(accounts);
console.log(accounts);




//day/mon/year




//Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function(e) {
	e.preventDefault(); // Prevents form from submitting


	//Curren Account display
	currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);

	if (currentAccount?.pin === Number(inputLoginPin.value)) {
		//Display welcome message
		labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
		// Display hidden app
		// containerApp.style.opacity=100;

		//Current date
		const now = new Date();
    const options ={
      hour:'numeric',
      minute:'numeric',
      day:'numeric',
      month:'long',
      year:'numeric',
      weekday:'long'
    }
    //option object has been used
    // Specify date and time format using options (i.e. full, long, medium, short)


    const locale= navigator.language;


    //language-sensitive date and time formatting.
    labelDate.textContent=new Intl.DateTimeFormat(locale,options).format(now);

		// const day = `${now.getDate()}`.padStart(2, 0)
		// const month = `${now.getMonth()+1}`.padStart(2, 0)
		// const year = now.getFullYear();
		// const hour = `${now.getHours()}`.padStart(2, 0)
		// const min = `${now.getMinutes()}`.padStart(2, 0)
		// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;

		// Clear fields
		inputLoginUsername.value = inputLoginPin.value = '';
		inputLoginPin.blur();

		updateUI(currentAccount)
	}
});

const updateUI = function(acc) {
	//Display movements
	displayMovements(acc);
	//Display Balance
	calcDisplayBalance(acc);
	//Display summary
	calcDisplaySummary(acc);
}

//transfer section
btnTransfer.addEventListener('click', function(e) {
	e.preventDefault();
	const amount = Number(inputTransferAmount.value);
	const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
	//Clear fields after transfer
	inputTransferAmount.value = inputTransferTo.value = '';

	//transfer condition
	if (amount > 0 && receiverAcc && currentAccount?.username !== receiverAcc?.username && currentAccount.balance >= amount) {

		//update the accounts
		currentAccount.movements.push(-amount);
		receiverAcc.movements.push(amount);
		//add transfer date
		currentAccount.movementsDates.push(new Date().toISOString());
		receiverAcc.movementsDates.push(new Date().toISOString());
		updateUI(currentAccount);
	}

});

//Delete account
btnClose.addEventListener('click', function(e) {
	e.preventDefault();
	if (inputCloseUsername.value === currentAccount.username && Number(inputClosePin.value) === currentAccount.pin)

	{
		const index = accounts.findIndex(acc => acc.username === currentAccount.username);
		accounts.splice(index, 1);

		containerApp.style.opacity = 0;

	}
	inputCloseUsername.value = inputClosePin.value = '';
});

//Request Loan
btnLoan.addEventListener('click', function(e) {
	e.preventDefault();
	const amount = Number(inputLoanAmount.value);
	if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
		//add movement
		currentAccount.movements.push(amount);
		inputLoanAmount.value = '';
		currentAccount.movementsDates.push(new Date().toISOString());
		updateUI(currentAccount);
	}
});

//button sort
let sorted = false;
btnSort.addEventListener('click', function(e) {
	e.preventDefault();
	displayMovements(currentAccount, !sorted);
	sorted = !sorted;

})