import { expect, Locator, Page } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

export class LoginPage {
    readonly page: Page;
    readonly baseUrl: string;
    readonly loginInput: Locator;
    readonly passwordInput: Locator;
    readonly logInButton: Locator;

    constructor(page: Page, baseUrl: string|undefined = process.env.BASE_URL) {
        this.page = page;
        this.baseUrl = baseUrl!;
        this.loginInput = page.locator('input[name="email"]'); 
        this.passwordInput = page.locator('input[name="password"]'); 
        this.logInButton = page.locator('.login-submit-frame > button');
    }

    async login(login: string, password: string): Promise<void> {
        //Navigation to login page
        await this.page.goto(this.baseUrl);
        //Filling out the login fields
        await this.loginInput.fill(login!);
        await this.passwordInput.fill(password!);
        //Clicking the login button
        await this.logInButton.click();
    }

    async succesLoginUrlValidation(): Promise<void> {
        //Checking if the user was redirected to the expected page
        await this.page.waitForLoadState();
    await expect(this.page).toHaveURL('https://registration.awsevents.com/flow/awsevents/reinvent24/attendee-portal/page/portal');
    }
}