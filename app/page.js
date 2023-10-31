'use client';

import { useEffect, useState} from 'react';

export default function Home() {
  
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const response = window.localStorage.getItem("places");
    // console.log('response in the homepage: ', response);

    if (response) {
      const allPlaces = JSON.parse(response);
      setPlaces(allPlaces);
      // console.log('This arrived in the home: ', allPlaces);
    } else if (!response) { 
      throw new Error("No data in localStorage");
    }
    
  }, []); 

  return (
    <main className="">
      {places.map((place, index) => (
        <a key={index} href={place.website} target='_blank'>
          <div className='bg-white rounded p-2 my-4 mx-2'>
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
            <p></p>
          </div>
        </a>
      ))}
    </main>
  );
}
