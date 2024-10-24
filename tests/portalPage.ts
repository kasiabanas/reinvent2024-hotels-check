import { Locator, expect, Page, BrowserContext} from "playwright/test";

export class PortalPage {
    readonly gotoHotlesButton: Locator;

    constructor(page:Page) {
        this.gotoHotlesButton = page.locator('button[data-test="rf-button-buttonElement"]');
    }

    async gotoHotels(context: BrowserContext): Promise<Page> {
        const pagePromise = context.waitForEvent('page');
        await this.gotoHotlesButton.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState();
        return newPage;
    }
}