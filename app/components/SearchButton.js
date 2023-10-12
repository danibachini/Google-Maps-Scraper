
import cities from 'cities.json';

export default function SearchButton({food, city, amount}) {

    const checkCity = city.split(', ');
    const correctCity = cityExists(checkCity[0], checkCity[1]);

    if (food !== '' && food !== 'Select Cuisine' && city !== '' && correctCity && amount !== '' && Number.isInteger(amount)) {
        console.log('everything is correct');

    } else {
        // throw error
        console.log('not yet');
    }

    return (
        // <div className="">
            <button 
            className="btn border-none text-teal-800 bg-amber-400 hover:bg-amber-500"
            >
                Search
            </button>
        // </div> 
    )
}

function cityExists(cityName, countryCode) {
    return cities.some(place => place.name === cityName && place.country === countryCode);
}

// https://www.google.com/maps/search/ (word + word)