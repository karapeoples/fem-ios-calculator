let runningTotal = 0;
let buffer = '';
let previousOperator;
const screen = document.querySelector(".input");

const rerender = () => {
	screen.textContent = buffer;
};

document.querySelector(".bubble").addEventListener("click", e => {
	buttonClick(e.target.textContent);
});

const buttonClick = value => {
	isNaN(parseInt(value)) ? handleSymbol(value) : handleNumber(value);
	rerender();
};

const handleNumber = value => {
	buffer === 0 ? buffer = value : buffer += value;
};

const handleSymbol = value => {
	switch (value) {
		case "C":
			buffer = 0;
			runningTotal = 0;
			previousOperator = null;
			break;
		case "=":
			if (previousOperator === null) {
				return;
			} else {
				flushOperation(parseInt(buffer));
				previousOperator = null;
				buffer =  +runningTotal;
				runningTotal = 0;
			}
			break;
		case "<-":
			buffer.length === 1 ? (buffer = "0") : (buffer = buffer.substring(0, buffer.length - 1));
			break;
		default:
		case "+":
		case "-":
		case "*":
		case "/":
			handleMath(value);
			break;
	}
};

const handleMath = value => {
	const intBuffer = parseInt(buffer);
	runningTotal === 0 ? (runningTotal = intBuffer) : flushOperation(intBuffer);
	previousOperator = value;
	buffer = 0;
};

const flushOperation = intBuffer => {
	previousOperator === "+"
		? (runningTotal += intBuffer)
		: previousOperator === "-"
		? (runningTotal -= intBuffer)
		: previousOperator === "*"
		? (runningTotal *= intBuffer)
		: (runningTotal /= intBuffer);
};

