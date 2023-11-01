'use client';

import { useEffect, useState} from 'react';
import ClearButton from './components/ClearButton';

export default function Home() {
 
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const response = window.localStorage.getItem("places");

    if (response) {
      const allPlaces = JSON.parse(response);
      setPlaces(allPlaces);
    } 
  }, []); 

  return (
    <main className="">
      
      {places.length > 0 ? (
        <>
          <div className=' text-white text-center mt-24 mb-16'>
            <h1 className='text-3xl'>Here are your options</h1>
            <ClearButton/>
          </div>
          <div className='grid md:grid-cols-2 '>
            {places.map((place, index) => (
              <a key={index} href={place.website} target='_blank'>
                <div className='bg-white rounded p-6 md:p-3 grid content-center md:pl-6 my-2 mx-2 md:h-44 md:border-l-8 md:border-transparent md:hover:border-amber-400'>
                  <h1 className='font-semibold text-lg text-cyan-600'>{place.name}</h1>
                  {place.totalRating ? (
                    <p>Rating of {place.totalRating} out of {place.amountOfReviews} reviews</p>
                  ) : (
                    <p>This place has no reviews</p>
                  )}
                  {place.phone ? (
                    <p>Phone: {place.phone}</p>
                  ) : (
                    <p>No phone available</p>
                  )}
                  {place.address ? (
                    <p>Get there: {place.address}</p>
                  ) : (
                    <p>No address available</p>
                  )}
                </div>
              </a>
            ))}
          </div>
        </>
      ) : (
        <p className='text-lg text-white text-center mt-24 mb-16'>After checking Google Maps, the results of your search will appear here</p>
      )}
    </main>
  );
}
