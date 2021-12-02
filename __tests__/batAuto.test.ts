
//this tests a specific car can be found and a shipping quote is available
import { Builder, Capabilities, By, until } from "selenium-webdriver";
import { urlIs } from "selenium-webdriver/lib/until";
import { getParsedCommandLineOfConfigFile, WatchDirectoryFlags } from "typescript";
//import { BatPages } from "./pageObjects/BatPages";


//pulling this from the getParsedCommandLineOfConfigFile.test.ts 
//file that Andrew created at the end of module 2.4 lecture video

//this first line is making sure we can use the chormedriver
const chromedriver = require('chromedriver')

//we are building the driver for chrome
const driver = new Builder().withCapabilities(Capabilities.chrome()).build()

//varialble for url https://bringatrailer.com/
const myUrl = "https://bringatrailer.com/"


//this is to test that the page will open
test("opening BaT", async () => {
    await driver.get("https://bringatrailer.com/")
})

//This tests the BaT site opened
test("Verify page loaded", async () => {
    let myCurrentUrl = await driver.getCurrentUrl()
    console.log(myCurrentUrl)
    //this is verifing that the current url is the one we expect
    expect(myCurrentUrl).toBe('https://bringatrailer.com/')
 
    //setting the variable to the current URL and comparing it to the home page url
    let myHomeUrl = await driver.getCurrentUrl()
    expect(myHomeUrl).toBe(myUrl)
    

})

//commented out for not while i test json file
//this does a search for NSX and then clicks into it

test("Search for Car", async () => {
    let magnifyGlassBtn = By.css('.search-open');
    let clickMagGlassBtn = await driver.findElement(magnifyGlassBtn);
    let searchInputField = By.css('.search-bar-input');;
    let typeInputField = await driver.findElement(searchInputField);
    
    await clickMagGlassBtn.click();
    await typeInputField.sendKeys('NSX\n');

    let autoSearchResult = By.xpath('(//img[@class="featured-listing-image wp-post-image"])[1]');
    let clickAutoSrchRslt = await driver.findElement(autoSearchResult);
    await clickAutoSrchRslt.click();

})




test("Get Shipping Quotes", async () => {
    let shippingTextField = By.css('#shipping-postal');
    let shipTextInput = await driver.findElement(shippingTextField);
    let getQuoteBtn = By.xpath('//button[contains(text(),"Get Quote")]');
    let quoteBtnClick = await driver.findElement(getQuoteBtn);
    
    
    await shipTextInput.sendKeys('28027');
    await quoteBtnClick.click();
    
      
})

test("Enclosed Shipping Quote Returned", async () => {
   
    await driver.wait(until.elementLocated(By.xpath('(//span[@class="quote-name"])[contains(text(),"Enclosed Transit")]')))
    let enclosedTransitText = await driver.findElement(By.xpath('(//span[@class="quote-name"])[contains(text(),"Enclosed Transit")]'));
    let isEnclosedTransitTrue = await enclosedTransitText.getText()
    expect(isEnclosedTransitTrue).toBe("Enclosed Transit"); 
    
})


test("Open Shipping Quote Returned", async () => {
    
    await driver.wait(until.elementLocated(By.xpath('(//span[@class="quote-name"])[contains(text(),"Open Transit")]')))
    let openTransitText = await driver.findElement(By.xpath('(//span[@class="quote-name"])[contains(text(),"Open Transit")]'));
    let isOpenTransitTrue = await openTransitText.getText()
    expect(isOpenTransitTrue).toBe("Open Transit"); 
    
    // closes the browser
    driver.quit()
})

    


