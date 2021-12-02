# ACQRPT5-BaT
BaT Solo Capstone

This project showcases my automation efforts to test Bring a Trailer's website https://www.bringatrailer.com
This project is a solo project for DevMountain quality assurance course

To execute these tests:
1. all code and tests were written and perfromed using the latest version of VSCode
2. clone the github repository to the local machine
3. install dependences: 'nmp i'
4. install selenium webdriver dependencies" 'npm i -d selenium-webdriver @types/selenium-webdriver chromedriver geckodriver'
5. execute tests: 'npx jest'

This site proved a little difficult to automate. The auctions do not generally last more than 7 days. Therefore, manual testing needs to be done to verify that a specific vehicle
is indeed up for auction.

A more skilled developer should be able to automate and verify results on a given list of vehicles.

For example, take an input file of cars, iterate through each one to see if there is a a live auction or not. If there is, proceed to the next test of checking a shipping quote. 
If a vehilce is not found, proceed to the next vehicle in the list.
