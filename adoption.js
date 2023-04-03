/* Key Variables */
const newkey = keysObj.apKey;
const secret = keysObj.secretKey;

/* Element Variables */
const searchInput = document.querySelector('#filter');
// const searchInputText = searchInput.value.trim().toLowerCase();
const searchButton = document.querySelector('#filtering');
const cards = document.getElementsByClassName('content-holder');
const images = document.getElementsByClassName('animal-img');
const content = document.getElementsByClassName('content');
const buttons = document.getElementsByClassName('know-more');

/* Helper Functions */

document.addEventListener("DOMContentLoaded", () => { 
// Generic fetchFrom Helper Function 
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

// Generic getToken Helper Function 
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

/* Functions */

// Giving each card an image, depending on the animal's type
const imagePlacing = async () => {
	try {
		const token = await getToken();
		const options = {
			headers: {
				'Authorization': token.token_type + ' ' + token.access_token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		const data = await fetchFrom('https://api.petfinder.com/v2/animals', options);
		for (let i = 0; i < images.length; i++) {
			const animalType = data.animals[i].type
			switch (animalType) {
				case "Dog":
					images[i].src = "Dog.png";
					break;
				case "Cat":
					images[i].src = "Cat.png";
					break;
				case "Rabbit":
					images[i].src = "Rabbit.jpg";
					break;
				case "Small & Furry":
					images[i].src = "Small-and-Furry.png";
					break;
				case "Horse":
					images[i].src = "Horse.png";
					break;
				case "Bird":
					images[i].src = "Bird.png";
					break;
				case "Scales, Fins, & Other":
					images[i].src = "Scales-Fins-and-Other.png";
					break;
				case "Barnyard":
					images[i].src = "Barnyard.png";
					break;
			}
			if (data.animals[i].photos.length !== 0) {
				images[i].src = data.animals[i].photos[0].medium;
			}
		}
	} catch (err) {
		console.log('Error getting animals', err);
		throw err;
	}
}
imagePlacing();

// Adding details to the text of the cards
const detailPlacing = async () => {
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
		for (let i = 0; i < content.length; i++) {
			if (data.animals[i].breeds.secondary === null) {
				data.animals[i].breeds.secondary = 'None'
			}
			content[i].innerHTML = `Name(s): ${data.animals[i].name}
                <br>
                Gender(s): ${data.animals[i].gender}
                <br>
                Species: ${data.animals[i].species}
                <br>
                Breed(s): 
				Primary - ${data.animals[i].breeds.primary}.
				<br>
				Secondary - ${data.animals[i].breeds.secondary}.
				<br>
                Size(s): ${data.animals[i].size}
				`
		}
	} catch (err) {
		console.log('Error getting animals', err);
		throw err;
	}
}
detailPlacing();

// Adding functionality to the "Want to know more?" button
const knowMore = async () => {
	try {
		const token = await getToken();
		const options = {
			headers: {
				'Authorization': token.token_type + ' ' + token.access_token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		const data = await fetchFrom('https://api.petfinder.com/v2/animals', options);
		for (let i = 0; i < buttons.length; i++) {
			buttons[i].href = data.animals[i].url;
		}
	} catch (err) {
		console.log('Error getting animals', err);
		throw err;
	}
}
knowMore();
});

/* Test Function Archive */

// Logging the Animals Object:
/* const getAnimals = async () => {
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

// Logging the possible animal types to the console
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

// Search Bar Functionality*
const filterSearch = async () => {
	try {
		const token = await getToken();
		const options = {
			headers: {
				'Authorization': token.token_type + ' ' + token.access_token,
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		};
		const data = await fetchFrom('https://api.petfinder.com/v2/animals', options);
		console.log('Event fired!');
		for (let i = 0; i < cards.length; i++) {
			const cardText = cards[i].innerText.trim().toLowerCase();
			if (cardText.includes(searchInputText)) {
				cards[i].style.display = '';
			} else {
				cards[i].style.display = 'none';
			}
		};
	} catch (err) {
		console.log('Error getting animals', err);
		throw err;
	}
}
searchButton.addEventListener('click', filterSearch);

*/