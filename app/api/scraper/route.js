
import * as cheerio from "cheerio";
import puppeteer from "puppeteer";
import { NextResponse } from "next/server";

export async function POST(req) {

    if (req.method === 'POST') {
        const data = await req.json();
        console.log('API - data inside if:', data);

        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();

        await page.setViewport({
            width: 1300,
            height: 900
        });

        await page.goto(`https://www.google.com/maps/search/${data.cuisine}+restaurant+${data.city}+${data.country}`);

        // accept the cookies automatically
        await page.waitForSelector('[aria-label="Accept all"]', { visible: true });
        await page.click('[aria-label="Accept all"]');

        setTimeout(async function () {
            console.log("This code runs after 2 seconds");

            const html = await page.content();
            const pages = await browser.pages();
            // await Promise.all(pages.map((page) => page.close()));

            // await browser.close();
            // console.log("browser closed");

            // get all 'a' tag parent where the 'a' tag href includes /maps/place/
            const $ = cheerio.load(html);
            const aTags = $("a");
            const parents = [];

            aTags.each((i, el) => {
                const href = $(el).attr("href");
                if (!href) {
                    return;
                }
                if (href.includes("/maps/place/")) {
                    parents.push($(el).parent());
                }
            });

            // console.log("parents", parents.length);

            const places = [];
            for (const parent of parents) {
                const url = parent.find("a").attr("href");
                const storeName = parent.find("div.fontHeadlineSmall").text();
                const ratingText = parent.find("span.fontBodyMedium > span").attr("aria-label");
                const rating = ratingText?.split("stars")?.[0]?.trim()
                const numberOfReviews = ratingText?.split("stars")?.[1]?.replace("Reviews", "")?.trim();

                // scrape additional information from each place page
                const additionalInfo = await eachPlacePage(page, url);

                places.push({
                    name: storeName,
                    totalRating: rating,
                    amountOfReviews: numberOfReviews,
                    otherInfo: additionalInfo,
                });

            };
        
        
        console.log(places);

// TOTAL INFO: name, rating, amount of reviews, address, phone and website
// autoscrolling the page and adding the places to the list up to the max amount of places defined by the user
// then, in the map, get the url of each place 
// for each url, still in the map, go to the url page
// grab the info street address, website (if available), and phone (if available)
// then go to the next place and repeat the process


        }, 3000);
        
        // await browser.close();
        // console.log("browser closed");

        return NextResponse.json({message: "Success"});
    } else {
        return NextResponse.json({message: "Failed"});
    }

    // I receive an object: { cuisine: buttonName, city: checkCity[0], country: checkCity[1], amount: range }

}

async function eachPlacePage(page, url) {

    try {
        await page.goto(url);
        const html = await page.content();
        const $ = cheerio.load(html);
        const divTags = $('div.fontBodyMedium');

        const addressDiv = divTags[3].children[0].data;
        const buttonPhone = $('button.CsEnBe[data-tooltip="Copy phone number"]');
        const phoneDiv = buttonPhone.attr('aria-label')?.split(":")?.[1];
        const buttonwebsite = $('a.CsEnBe[data-tooltip="Open website"]');
        const websiteDiv = buttonwebsite.attr('aria-label')?.split(":")?.[1];

        console.log('This is the address: ', addressDiv);
        console.log('This is the Website: ', websiteDiv);
        console.log('This is the phone number: ', phoneDiv);

        return "Success"; // Or whatever you want to return upon success

    } catch (error) {
        console.error(`Error while processing ${url} - This is the error: ${error}`);
        return "Error"; // Or an error indicator
    }

}
