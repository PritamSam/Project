import { Page, Locator } from '@playwright/test';

class HomePage{

    page: Page;
    searchbox: Locator;
    productprice: Locator;
    productname: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.searchbox = page.getByRole('searchbox', { name: 'Search Amazon.in' });
        this.productprice = page.locator('//div[@class="puisg-row"]//div[@class="puisg-row puis-desktop-list-row"]//span[@class="a-price-whole"]');
        this.productname = page.locator('//div[@class="puisg-row"]//h2/span ');
    }

    async searchProduct(productName: string) {
        await this.searchbox.fill(productName);
        await this.searchbox.press('Enter');
    }

    async getProductPrices(): Promise<number[]> {
    const priceTexts = await this.productprice.allTextContents();

    const prices = priceTexts
        .map(text => text.replace(/,/g, '').trim())
        .filter(text => text !== '')               
        .map(text => parseInt(text));               

    return prices;
    }

    async getProductNames(): Promise<string[]> {
        const nameTexts = await this.productname.allTextContents(); 
        return nameTexts;
    }

    async getproductDetail(productName: string, context: any) {
        const product = this.page
        .locator('a:has(h2 span)')
        .filter({ hasText: productName})
        .first();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            product.click()
        ]);

        await newPage.waitForLoadState();
        const details = await newPage.locator('#feature-bullets li .a-list-item').allTextContents();
        return details;

    }

}
export default HomePage;