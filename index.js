const express = require('express');

const app = express();

const port = 3000;

const winston = require('winston');

const {
	combine,
	timestamp,
	label,
	printf
} = winston.format;

const myFormat = printf(({
	level,
	message,
	label,
	timestamp
}) => {
	return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = winston.createLogger({
	level: 'info',
	format: combine(label({
		label: 'calculator-microservice'
	}),
	timestamp(),
	myFormat), transports: [
		new winston.transports.Console(),
		new winston.transports.File({
			filename: 'logs/error.log',
			level: 'error'
		}),
		new winston.transports.File({
			filename: 'logs/combined.log'
		})
	]
});

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.get('/add', (req, res) => {
	const num1 = parseFloat(req.query.num1);
	const num2 = parseFloat(req.query.num2);
	if (isNaN(num1) || isNaN(num2)) {
		logger.error('Invalid input for addition operation');
		res.status(400).send('Invalid input');
	} else {
		const result = num1 + num2;
		logger.log('info', `Addition operation: ${num1} + ${num2} = ${result}`);
		res.send(`${num1} + ${num2} = ${result}`);
	}
});

app.get('/subtract', (req, res) => {
	const num1 = parseFloat(req.query.num1);
	const num2 = parseFloat(req.query.num2);
	if (isNaN(num1) || isNaN(num2)) {
		logger.error('Invalid input for subtraction operation');
		res.status(400).send('Invalid input');
	} else {
		const result = num1 - num2;
		logger.log('info', `Subtraction operation: ${num1} - ${num2} = ${result}`);
		res.send(`${num1} - ${num2} = ${result}`);
	}
});

app.get('/multiply', (req, res) => {
	const num1 = parseFloat(req.query.num1);
	const num2 = parseFloat(req.query.num2);
	if (isNaN(num1) || isNaN(num2)) {
		logger.error('Invalid input for multiplication operation');
		res.status(400).send('Invalid input');
	} else {
		const result = num1 * num2;
		logger.log('info', `Multiplication operation: ${num1} * ${num2} = ${result}`);
		res.send(`${num1} * ${num2} = ${result}`);
	}
});

app.get('/divide', (req, res) => {
	const num1 = parseFloat(req.query.num1);
	const num2 = parseFloat(req.query.num2);
	if (isNaN(num1) || isNaN(num2)) {
		logger.error('Invalid input for division operation');
		res.status(400).send('Invalid input');
	} else if (num2 === 0) {
		logger.error('Division by zero error');
		res.status(400).send('Division by zero error');
	} else {
		const result = num1 / num2;
		logger.log('info', `Division operation: ${num1} / ${num2} = ${result}`);
		res.send(`${num1} / ${num2} = ${result}`);
	}
});

app.listen(port, () => {
	console.log(`Calculator microservice listening at http://localhost:${port}`);
});