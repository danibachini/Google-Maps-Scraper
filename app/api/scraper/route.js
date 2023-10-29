
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

            const amount = data.amount;

            async function autoScroll (page, amount) {
                await page.evaluate(async (amount) => {
                    const wrapper = document.querySelector('div[role="feed"]');
                    let currentScrollCount = 0;
            
                    await new Promise((resolve) => {
                        var totalHeight = 0;
                        var distance = 1000;
            
                        var timer = setInterval(async () => {
                            var scrollHeightBefore = wrapper.scrollHeight;
                            wrapper.scrollBy(0, distance);
                            totalHeight += distance;
                            currentScrollCount = currentScrollCount + 5;

                            if (currentScrollCount > amount) {
                                clearInterval(timer);
                                resolve();
                                
                            } else if (totalHeight >= scrollHeightBefore){
                                totalHeight = 0;
                            }
            
                        }, 200);
                    });
                }, amount);
            }
            
            if (amount > 7) {
                await autoScroll(page, amount);
            }

            // get all 'a' tag parent where the 'a' tag href includes /maps/place/
            const html = await page.content();
            const $ = cheerio.load(html);
            const aTags = $("a");
            const parents = [];
            
            aTags.each((i, el) => {
                const href = $(el).attr("href");
                if (!href) {
                    return;
                }
                if (href.includes("/maps/place/") && parents.length < amount) {
                    parents.push($(el).parent());
                }
            });

            const places = [];
            for (const parent of parents) {
                const url = parent.find("a").attr("href");
                const storeName = parent.find("div.fontHeadlineSmall").text();
                const ratingText = parent.find("span.fontBodyMedium > span").attr("aria-label");
                const rating = ratingText?.split("stars")?.[0]?.trim()
                const numberOfReviews = ratingText?.split("stars")?.[1]?.replace("Reviews", "")?.trim();
                const additionalInfo = await eachPlacePage(page, url);
                
                places.push({
                    name: storeName,
                    totalRating: rating,
                    amountOfReviews: numberOfReviews,
                    address: additionalInfo[0].address,
                    website: additionalInfo[0].website,
                    phone: additionalInfo[0].phone,
                });

            };

            console.log(places);
            await browser.close();

        }, 3000);

        return NextResponse.json({message: "Success"});
    } else {
        return NextResponse.json({message: "Failed"});
    }
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
        const websiteDiv = buttonwebsite.attr("href");

        let data = [];
        data.push({
            address: addressDiv,
            website: websiteDiv,
            phone: phoneDiv
        })

        return data; 

    } catch (error) {
        console.error(`Error while processing ${url} - This is the error: ${error}`);
        return "Error"; 
    }
}
