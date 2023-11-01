# Foodie Mapper
## Google Maps' Scraper 

This is an application to find restaurants in any city of the world. The user selects the cuisine, types in the city and informs how many options he wishes to see (up to 20) and the application scrapes Google Maps to collect the information. 

The options will inform the following about each place: 

- Name of the restaurant
- The rating and the amount of reviews (if the place has any reviews)
- Phone number (if available)
- Address (if available)

Also, each "box" of information representing a place is clickable and takes the user to the website of the restaurant (if the website was available on Google Maps).

If the user desires to make a new search, he can directly fill in the form. The user also has the possibility to clear the options off the screen even though it's not necessary to perform a new search. 

This application does not use any external API. 


**Video Demo:**
https://youtu.be/kaV2UzLNi8U

### Features: 
- Form collecting the info to scrape Google Maps
- Responsive Design

### Technologies: 
- Next.js 13 (React and Node.js)
- Tailwind 
- Puppeteer
