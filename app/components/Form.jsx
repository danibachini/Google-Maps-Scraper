
'use client';
import { useState } from "react";
import cities from 'cities.json';
import { scraper } from "../api/scraper/route";

export default function Form() {
    const list = ['Barbecue', 'Vegetarian', 'Vegan', 'Pizza', 'Cafe', 'Sea Food', 'Street Food', 'Fast Food', 'Sushi', 
    'Chinese', 'Thai', 'Mexican', 'American', 'Indian', 'Japanese', 'Spanish', 'Korean', 'French', 'Italian', 'Greek', 
    'Mediterranean', 'European', 'Lebanese', 'Turkey'];
    const [buttonName, setButtonName] = useState('Select Cuisine');
    const [open, setOpen] = useState(false);
    const [openCity, setOpenCity] = useState(false);
    const [value, setValue] = useState('');
    const [search, setSearch] = useState(false);
    const [range, setRange] = useState(15);

    // set true/false for displaying the dropdown with the cities options
    const onChange = (e) => {
        setValue(e.target.value);
        if (openCity===false) {
            setOpenCity((prevOpenCity) => !prevOpenCity);
        }
    }

    // set the range provided by the user
    const handleRangeChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setRange(newValue);
    };

    // handle the submit: check if all input provided by the user are correct and send them to the API
    const handleSubmit = async (e) => {
        e.preventDefault();

        const checkCity = value.split(', ');
        const correctCity = cityExists(checkCity[0], checkCity[1]);

        if (buttonName !== '' && list.includes(buttonName) && value !== '' && correctCity && range !== '' && Number.isInteger(range)) {
            const data = {
                cuisine: buttonName, 
                city: checkCity[0], 
                country: checkCity[1],
                amount: range
            }
            scraper(data);
    
        } else {
            // throw error <<<<<<<<<<<<<-------------------------------------------------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!
            console.log('not yet');
        }
    }

    // return true if city and country do exist in the json to prevent mispelled or unwanted data
    function cityExists(cityName, countryCode) {
        return cities.some(place => place.name === cityName && place.country === countryCode);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-16 md:mt-36 flex flex-wrap gap-4 justify-around items-center">

                {/* dropdown to select cuisine */}
                <div>
                    <label 
                    className="my-1 w-52 btn border-none bg-white hover:bg-slate-400 text-zinc-600 hover:text-white" 
                    onClick={() => setOpen((prevOpen) => !prevOpen)}
                    >
                        {buttonName}
                    </label>
                    {open && 
                        <ul className="w-52 p-2 bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto absolute z-10">
                            {list.map((item, i) => (
                                <div 
                                key={i} 
                                onClick={() => { setButtonName(item); setOpen(false); }}
                                className="hover:bg-slate-400 rounded-lg text-zinc-600 hover:text-white text-center py-2 cursor-pointer"
                                >
                                    <li><a className=" justify-center">{item}</a></li>
                                </div>
                            ))}
                        </ul>
                    }
                </div>

                {/* input with auto-complete to select city/country */}
                <div>
                    <input 
                    required 
                    type='text' 
                    value={value}
                    onChange={onChange}
                    placeholder="City"
                    className='outline-0 w-52 md:w-72 h-12 my-1 px-4 rounded-lg bg-white text-zinc-600' 
                    />
                    {openCity && 
                        <ul className="w-52 md:w-72 p-2 bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto absolute z-10">
                        {cities.filter((item) => {
                            const searchTerm = value.toLowerCase();
                            const city = item.name.toLowerCase();
                            return (
                                searchTerm && city.startsWith(searchTerm)
                                )
                            })
                        .map((item, i) => (
                            <div 
                            key={i} 
                            onClick={() => { setValue(item.name +', ' + item.country); setOpenCity(false); setSearch(false); }}
                            className="hover:bg-slate-400 rounded-lg text-zinc-600 hover:text-white text-center py-2 cursor-pointer"
                            >
                                <li><a className=" justify-center">{item.name}, {item.country}</a></li>
                            </div>
                        ))}
                        </ul>
                    }
                </div>

                <div>
                    <p className="text-white ">Amount of Options:</p>
                </div>

                {/* range to select how many restaurants to display - min of 5 and max of 30 */}
                <div>
                    <input type="range" min={5} max="30" value={range} onChange={handleRangeChange} className="range" step="5" />
                    <div className="w-52 flex justify-between text-xs px-2 text-white">
                        <span value={5}>5</span>
                        <span value={10}>10</span>
                        <span value={15}>15</span>
                        <span value={20}>20</span>
                        <span value={25}>25</span>
                        <span value={30}>30</span>
                    </div>
                </div>

            </div>

            <div className="text-center my-14">
                <button
                type="submit"
                className="btn border-none text-teal-800 bg-amber-400 hover:bg-amber-500"
                >
                    Search
                </button>
            </div>

        </form>
    )
}
