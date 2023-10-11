
'use client';
import { useState } from "react";
import cities from 'cities.json';

export default function Form() {
    const list = ['Barbecue', 'Vegetarian', 'Vegan', 'Pizza', 'Cafe', 'Sea Food', 'Street Food', 'Fast Food', 'Sushi', 
    'Chinese', 'Thai', 'Mexican', 'American', 'Indian', 'Japanese', 'Spanish', 'Korean', 'French', 'Italian', 'Greek', 
    'Mediterranean', 'European', 'Lebanese', 'Turkey'];
    const [buttonName, setButtonName] = useState('Select Cuisine');
    const [open, setOpen] = useState(false);
    const [openCity, setOpenCity] = useState(false);
    const [value, setValue] = useState('');
    const [search, setSearch] = useState(false);

    const onChange = (e) => {
        setValue(e.target.value);
        if (openCity===false) {
            setOpenCity((prevOpenCity) => !prevOpenCity);
        }
    }

    return (
        <div className="mt-16 md:mt-36 flex flex-wrap gap-4 justify-around">
            <div>
                <label 
                className="my-1 w-52 btn border-none bg-white hover:bg-slate-400 text-zinc-600 hover:text-white" 
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                >
                    {buttonName}
                </label>
                {open && 
                    <ul className=" w-52 p-2 bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto absolute z-10">
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

            <div>
                <input 
                required 
                type='text' 
                value={value}
                onChange={onChange}
                placeholder="City"
                className='outline-0 w-72 h-12 my-1 px-4 rounded-lg bg-white text-zinc-600' 
                />
                {openCity && 
                    <ul className=" w-72 p-2 bg-white shadow-lg rounded-lg max-h-96 overflow-y-auto absolute z-10">
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
        </div>
    )
}





// info coming from json file
// country: "AD"
// lat: "42.46372"
// lng: "1.49129"
// name: "Sant Julià de Lòria"



// form:
// - make all letters lowcase
// - now allow special chars (e.g.: @, !, ?, ;, §,  etc)

// questions:
// city - get a json with all cities and countries
// country

// amount of data: 
// options like 5, 10, 15, 20, 25 and 30

// https://www.google.com/maps/search/ (word + word)