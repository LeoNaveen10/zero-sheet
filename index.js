const axios = require('axios');
const { createData } = require('./zerosheetUpload');
require('dotenv').config();
const cron = require('node-cron');

const currency = {
	SGD: 'Singapore Dollar',
	MYR: 'Malaysian Ringgit',
	EUR: 'Euros',
	AUD: 'Australian Dollar',
	JPY: 'Japanese Yen',
	CNH: 'Chinese Yuan',
	HKD: 'Hong Kong Dollar',
	CAD: 'Canadian Dollar',
	INR: 'Indian Rupee',
	DKK: 'Danish Krone',
	GBP: 'British Pound Sterling',
	RUB: 'Russian Ruble',
	NZD: 'New Zealand Dollar',
	MXN: 'Mexican Peso',
	IDR: 'Indonesian Rupiah',
	TWD: 'Taiwan Dollar',
	THB: 'Thai Baht',
	VND: 'Vietnamese Dong',
};

let storedCurrencyValues = {};

const currencyFetcher = async () => {
	for (let cur in currency) {
		const requestObject = {
			method: 'GET',
			url: process.env.RAPID_API_URL,
			params: {
				from: 'USD',
				to: cur,
				q: '1.0',
			},
			headers: {
				'X-RapidAPI-Key': process.env.RAPID_API_KEY,
				'X-RapidAPI-Host': process.env.RAPID_API_HOST,
			},
		};
		try {
			const response = await axios.request(requestObject);

			storedCurrencyValues[currency[cur]] = +response.data.toFixed(2);
		} catch (error) {
			console.error(error);
		}
	}
	await createData(new Date().toISOString(), storedCurrencyValues);
};

//This will run every 12 hours
cron.schedule('* */12 * * *', async () => {
	console.log('running a task every 12 hours');
	await currencyFetcher();
});
