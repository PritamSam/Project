import { test, expect } from '@playwright/test';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import { loginHelper } from '../utils/loginHelper';
const testData = require('../testData/test.json');

  let homePage: HomePage;
  let loginPage: LoginPage;
  let lowestName: string;
  let highestName: string;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);

    await loginHelper(page, testData.Valid_Username, testData.Valid_Password);
  });

  test('Find lowest and highest mobile price with product name', async ({ page}) => {

    await homePage.searchProduct(testData.Valid_Filter);

    await page.waitForSelector('div[data-component-type="s-search-result"]');

    const prices = await homePage.getProductPrices();
    const names = await homePage.getProductNames();

    const products: { name: string; price: number }[] = [];

    for (let i = 0; i < prices.length; i++) {
      if (names[i] && prices[i]) {
        products.push({
          name: names[i],
          price: prices[i]
        });
      }
    }

    const sortedProducts = products.sort((a, b) => a.price - b.price);

    const lowest = sortedProducts[0];
    const highest = sortedProducts[sortedProducts.length - 1];

    console.log('Lowest Product:', lowest);
    console.log('Highest Product:', highest);

    lowestName = sortedProducts[0].name;
    highestName = sortedProducts[sortedProducts.length - 1].name;

    expect(products.length).toBeGreaterThan(0);
  });

  test('Click the Lowest and highest Price of Product and Print "About this item" details', async ({ page,context }) => {

    await homePage.searchProduct('mobile');

    await page.waitForSelector('div[data-component-type="s-search-result"]');

    const lowDetails = await homePage.getproductDetail(lowestName, context);
    console.log(lowDetails);

    const highDetails = await homePage.getproductDetail(highestName, context);
    console.log(highDetails);
  });

