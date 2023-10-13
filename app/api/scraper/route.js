
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(req) {

    if (req.method === 'POST') {
        const data = await req.json();
        console.log('API - data inside if:', data);
        // console.log('this is the cuisine: ', data.cuisine);

        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.setViewport({
            width: 1300,
            height: 900
        });

        await page.goto(`https://www.google.com/maps/search/${data.cuisine}+${data.city}+${data.country}`);

        // accept the cookies automatically
        await page.waitForSelector('[aria-label="Accept all"]', { visible: true });
        await page.click('[aria-label="Accept all"]');

        setTimeout(async function () {
            // Your code here
            console.log("This code runs after 2 seconds");
            console.log(page);
            // const places =  await parsePlaces(page); 
            // console.log(places);

        }, 3000);


        return NextResponse.json({message: "Success"});
    } else {
        return NextResponse.json({message: "Failed"});
    }

    // I receive an object: { cuisine: buttonName, city: checkCity[0], country: checkCity[1], amount: range }

}



async function parsePlaces(page) {

    let places = [];
    console.log('inside parsePlaces');
    const elements = await page.$$('.fontHeadlineSmall');
    console.log('those are the elements', elements);

    if (elements && elements.length) {
        console.log('inside if elements');
        elements.map(async (place) => {
            const name = await place.evaluate(div => div.innerHTML);

            places.push({ name });
        })
    }

    return places; 
}



// fontHeadlineSmall
// inside of it, I have to get the innerHTML (this is the name of the place)

// ${data.cuisine}+${data.city}+${data.country}
// https://www.google.com/maps/search/sushi (word + word)