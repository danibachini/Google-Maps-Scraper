
import * as cheerio from "cheerio";
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

        await page.goto(`https://www.google.com/maps/search/${data.cuisine}+restaurant+${data.city}+${data.country}`);

        // accept the cookies automatically
        await page.waitForSelector('[aria-label="Accept all"]', { visible: true });
        await page.click('[aria-label="Accept all"]');

        setTimeout(async function () {
            // Your code here
            console.log("This code runs after 2 seconds");
            // console.log(page);
            // const places =  await parsePlaces(page); 
            // console.log(places);

            const html = await page.content();
            const pages = await browser.pages();
            await Promise.all(pages.map((page) => page.close()));

            await browser.close();
            console.log("browser closed");

            // get all a tag parent where a tag href includes /maps/place/
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

            console.log("parents", parents.length);

            const placesUrls = [];

            parents.forEach((parent) => {
              const url = parent.find("a").attr("href");
              placesUrls.push({
                placeUrl: url,
              });
              
            //   const website = parent.find('a[data-value="Website"]').attr("href");
            //   const storeName = parent.find("div.fontHeadlineSmall").text();
            //   const ratingText = parent
            //     .find("span.fontBodyMedium > span")
            //     .attr("aria-label");

            //     // get the first div that includes the class fontBodyMedium
            //     const bodyDiv = parent.find("div.fontBodyMedium").first();
            //     const children = bodyDiv.children();
            //     const lastChild = children.last();
            //     const firstOfLast = lastChild.children().first();
            //     const lastOfLast = lastChild.children().last(); 
            //     // console.log('this is bodydiv: ',bodyDiv);

            //     // console.log('LAST OF LAST: ', firstOfLast?.text().split("·"));

            //     console.log('ONE THAT MATCH: ', parent.find("div.fontBodyMedium").children);
            //     // console.log(lastOfLast.text);

            //     places.push({
            //         address: firstOfLast?.text()?.split("·")?.[1]?.trim(),
            //         phone: lastOfLast?.text()?.split("·")?.[1]?.trim(),
            //         googleUrl: url,
            //         bizWebsite: website,
            //         storeName,
            //         // ratingText,
            //         stars: ratingText?.split("stars")?.[0]?.trim()
            //         ? Number(ratingText?.split("stars")?.[0]?.trim())
            //         : null,
            //         numberOfReviews: ratingText
            //         ?.split("stars")?.[1]
            //         ?.replace("Reviews", "")
            //         ?.trim()
            //         ? Number(
            //             ratingText?.split("stars")?.[1]?.replace("Reviews", "")?.trim()
            //             )
            //         : null,
            //     });
        });
        
        console.log(placesUrls);



        }, 3000);


        return NextResponse.json({message: "Success"});
    } else {
        return NextResponse.json({message: "Failed"});
    }

    // I receive an object: { cuisine: buttonName, city: checkCity[0], country: checkCity[1], amount: range }

}



// async function parsePlaces(page) {

//     let places = [];
//     console.log('inside parsePlaces');
//     const elements = await page.$$('.fontHeadlineSmall div');
//     console.log('those are the elements', elements);

//     // if (elements && elements.length) {
//     //     console.log('inside if elements');
//     //     elements.map(async (place) => {
//     //         const name = await place.evaluate(div => div.innerHTML);

//     //         places.push({ name });
//     //     })
//     // }

//     // return places; 
// }



// fontHeadlineSmall
// inside of it, I have to get the innerHTML (this is the name of the place)

// ${data.cuisine}+${data.city}+${data.country}
// https://www.google.com/maps/search/sushi (word + word)