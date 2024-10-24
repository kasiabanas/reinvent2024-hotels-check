import { Locator, expect, Page} from "playwright/test";

export class BookHotelPage {

    readonly page: Page;
    readonly cookieBanerButton: Locator;
    readonly checkIn: Locator;
    readonly checkOut: Locator;
    readonly GuestsButton: Locator;
    readonly SubmitBookButton: Locator;
    //readonly selectDayDataHandler: Locator;

    constructor(page: Page) {
        this.page = page;

        this.cookieBanerButton = page.locator('div#cookie-banner button#acceptAllBtn');
        // search form elments
        this.checkIn = page.locator('li#check-in');
        this.checkOut = page.locator('li#check-out');
        this.GuestsButton = page.locator('input#spinner-guest');
        this.SubmitBookButton = page.locator('li.searchButton');


        //this.selectDayDataHandler = page.locator('td#dp_in_');
    }

    async validateUrl() {
        await expect(this.page).toHaveURL(RegExp('^https:\/\/book\.passkey\.com\/entry\?.*$'), { timeout: 15000 });
    }

    async removeCookieBaner() {
        await this.cookieBanerButton.click();
    }

    async CheckHotel(dateFrom: Date, dateTo: Date): Promise<void> {
        await this.checkIn.locator('input#check-in-date').click();
        await expect(this.checkIn.locator('div.holder.calendar')).toBeVisible();
        //await this.page.waitForTimeout(1000);  // animation
        // Generowanie dynamicznego selektora na podstawie daty
        const checkInDay = dateFrom.getUTCDate();
        const checkInMonth = dateFrom.getMonth(); // Miesiąc (0-11)
        await this.checkIn.locator(`td#dp_in_${checkInMonth}_${checkInDay}`).click();
        //const checkInSelector = `td#dp_in_${checkInMonth}_${checkInDay}`;
        // Kliknięcie w odpowiedni dzień w kalendarzu
        //await this.calendarHolder.locator(checkInSelector).click();
        // Sprawdzenie, czy pole check-in date nie jest puste
        await expect(this.checkIn.locator('input#check-in-date')).not.toBeEmpty();
        await this.checkOut.locator('input#check-out-date').click();
        await this.page.waitForTimeout(1000); // animacja
        await expect(this.checkOut.locator('div.holder.calendar')).toBeVisible();
        await this.checkOut.locator(`td#dp_out_${dateTo.getMonth()}_${dateTo.getUTCDate()}`).click();
        await expect(this.checkOut.locator('input#check-out-date')).not.toBeEmpty();
        await this.GuestsButton.fill('2');
        await this.SubmitBookButton.click();

        await expect(this.page).toHaveURL(RegExp('^https:\/\/book\.passkey\.com\/event\/.*$'), { timeout: 15000 });
        await this.page.waitForLoadState();
        await expect(this.page.getByText('We couldn\'t find any results for your search')).toBeVisible();
    }
}