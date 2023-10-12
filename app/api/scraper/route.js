
// import puppeteer from "puppeteer";
// import puppeteer from 'puppeteer-core';
const puppeteer = require('puppeteer');

export async function scraper(data) {
    
    console.log('API function received data:', data);
//     // I receive an object: { cuisine: buttonName, city: checkCity[0], country: checkCity[1], amount: range }
    
//     const browser = await puppeteer.launch({headless: false});
//     const page = await browser.newPage();

//     await page.setViewport({
//         width: 1300,
//         height: 900
//     });

//     await page.goto(`https://www.google.com/maps/search/sushi`);

}

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();

    await page.setViewport({
        width: 1300,
        height: 900
    });

    await page.goto(`https://www.google.com/maps/search/sushi`);

})



// ${data.cuisine}+${data.city}+${data.country}
// https://www.google.com/maps/search/sushi (word + word)