
//this tests a motorcycle is found and the shipping returned is only enclosed
import { Builder, Capabilities, By, until, WebElement, WebDriver, Actions } from "selenium-webdriver";
import { urlIs } from "selenium-webdriver/lib/until";
import { collapseTextChangeRangesAcrossMultipleVersions, getParsedCommandLineOfConfigFile, isAssertionExpression, WatchDirectoryFlags } from "typescript";
//import { BatPages } from "./pageObjects/BatPages";

//pulling this from the getParsedCommandLineOfConfigFile.ttest.ts 
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

//This tests the actual Bring a Trailer site loads
test("Verify page loaded", async () => {
    let myCurrentUrl = await driver.getCurrentUrl()
    console.log(myCurrentUrl)
    //this is verifing that the current url is the one we expect
    expect(myCurrentUrl).toBe('https://bringatrailer.com/')
 
    //setting the variable to the current URL and comparing it to the home page url
    let myHomeUrl = await driver.getCurrentUrl()
    expect(myHomeUrl).toBe(myUrl)
    

})

test("Search for Motorcycle", async () => {
    let magnifyGlassBtn = By.css('.search-open');
    let clickMagGlassBtn = await driver.findElement(magnifyGlassBtn);
    let searchInputField = By.css('.search-bar-input');;
    let typeInputField = await driver.findElement(searchInputField);
    
    await clickMagGlassBtn.click();
    await typeInputField.sendKeys('motorcycle\n');

    let autoSearchResult = By.xpath('(//img[@class="featured-listing-image wp-post-image"])[2]');
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


test("Open Shipping Quote should not be returned", async () => {
    //this tests to verify that an open transit shipping option is not available.
    try {
        await driver.findElement(By.xpath('(//span[@class="quote-name"])[contains(text(),"Open Transit")]'))
    }
    catch {
        console.log('Element is not present')
    }
    // let openTransitText = await driver.findElements(By.xpath('(//span[@class="quote-name"])[contains(text(),"Open Transit")]'));
    // expect(openTransitText).toBeFalsy
    
        
    // closes the browser
    driver.quit()
})

    


