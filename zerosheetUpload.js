const axios = require('axios');

module.exports = {
	async createData(date, currencyData) {
		try {
			await axios.post(
				process.env.ZEROSHEET_API_URL,
				{
					Date: date,
					...currencyData,
				},
				{
					headers: {
						Authorization: `Bearer ${process.env.ZEROSHEET_BEARER_TOKEN}`,
					},
				}
			);
		} catch (error) {
			console.log(`error happened`);
			console.log(error);
		}
	},
};
