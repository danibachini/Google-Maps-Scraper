
'use client';
import { useState } from "react";
import cities from 'cities.json';
import SearchButton from "./SearchButton";

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

    const onChange = (e) => {
        setValue(e.target.value);
        if (openCity===false) {
            setOpenCity((prevOpenCity) => !prevOpenCity);
        }
    }

    const handleRangeChange = (event) => {
        const newValue = parseInt(event.target.value, 10);
        setRange(newValue);
    };

    return (
        <>
            <div className="mt-16 md:mt-36 flex flex-wrap gap-4 justify-around items-center">
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
                <SearchButton food={buttonName} city={value} amount={range} />
            </div>

        </>
    )
}
