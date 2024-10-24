import { test, expect } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { BookHotelPage } from "./bookHotelPage";
import { PortalPage } from "./portalPage";

test.describe('Test reivent', () => { 
    test.beforeEach(async ({ page }) =>{
    });

    test ('User login and book Hotel', async ({ page, context }) => {
        const login = process.env.LOGIN;
        const password = process.env.PASSWORD;
        const dateFrom = new Date(process.env.DATE_FROM || '2024-12-01');
        const dateTo = new Date(process.env.DATE_TO || '2024-12-06');

        expect(login).not.toBeUndefined();
        expect(password).not.toBeUndefined();
        
        const loginPage = new LoginPage(page);
        await loginPage.login(login!, password!);
        await loginPage.succesLoginUrlValidation();

        const portalPage = new PortalPage(page);
        const newPage = await portalPage.gotoHotels(context);

        const bookHotelPage = new BookHotelPage(newPage);
        await bookHotelPage.validateUrl();
        await bookHotelPage.removeCookieBaner();
        await bookHotelPage.CheckHotel(dateFrom, dateTo);

    });
});