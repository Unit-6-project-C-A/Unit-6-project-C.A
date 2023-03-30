const newkey = keysObj.apKey;
const secret = keysObj.secretKey;

const fetchFrom = async (url, options) => {
	try {
		const resp = await fetch(url, options);
		const data = await resp.json();
		return data;
	} catch (err) {
		console.log('Error fetching data', err);
		throw err;
	}
}

const getToken = async () => {
	try {
		const body = `grant_type=client_credentials&client_id=${newkey}&client_secret=${secret}`;
		const options = {
			method: 'POST',
			body: body,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		const data = await fetchFrom('https://api.petfinder.com/v2/oauth2/token', options);
		return data;
	} catch (err) {
		console.log('Error getting token', err);
		throw err;
	}
}

const getAnimals = async () => {
	try {
		const token = await getToken();
		const options = {
			headers: {
				'Authorization': token.token_type + ' ' + token.access_token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		const data = await fetchFrom('https://api.petfinder.com/v2/animals', options);
		console.log(data);
	} catch (err) {
		console.log('Error getting animals', err);
		throw err;
	}
}

getAnimals();

const getAnimalTypes = async () => {
	try {
		const token = await getToken();
		const options = {
			headers: {
				'Authorization': token.token_type + ' ' + token.access_token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		const data = await fetchFrom('https://api.petfinder.com/v2/types', options);
		console.log(data);
	} catch (err) {
		console.log('Error getting animals', err);
		throw err;
	}
}

getAnimalTypes();
