import * as cheerio from "cheerio";
import fs from "fs";

console.log("Starting of the to-do-node-api-sandbox...");

fetch("https://www.daft.ie/sold-properties/dublin-18-dublin?salePrice_to=500000&numBeds_from=2&soldDate_from=2025&soldDate_to=2025&numBaths_from=2&sort=soldDateDesc").then(async (response) => {
    // Check if the response is ok
    if (!response.ok) {
        throw new Error("Network response was not ok");
    }

    const daftText = await response.text();
    // Load the HTML into Cheerio
    const $ = cheerio.load(daftText);
    writeFile("daft.html", daftText);

    const listings = [];

    // Look for listing containers – class names may need updating
    $('div.SearchPage__Result-gg133s-2').each((i, el) => {
      const titleElement = $(el).find('a.PropertyInformationCommonStyles__StyledLink-sc-sf8r8-1');
      const priceElement = $(el).find('div.TitleBlock__Price-sc-1avkvav-4');

      const title = titleElement.text().trim();
      const price = priceElement.text().trim();
      const link = titleElement.attr('href');

      if (title && price && link) {
        listings.push({
          title,
          price,
          link: `https://www.daft.ie${link}`
        });
      }
    });

    console.log(listings);

    return;
}).catch((error) => {
    // Handle any errors that occurred during the fetch
    console.error("There was a problem with the fetch operation:", error);
});

const writeFile = async (fileName, data) => {
    
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            console.error("Error writing file:", err);
        } else {
            console.log("File written successfully");
        }
    });
}