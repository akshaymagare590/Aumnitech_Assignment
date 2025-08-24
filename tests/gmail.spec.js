import { test, expect, chromium } from '@playwright/test';
import { gmail } from '../page/gmail.js';

test('gmail login', async () => {

    const browser = await chromium.launch({
        headless: false,
        args: ['--incognito'],
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    const login = new gmail(page);
    await login.GotoLoginPage();
    await login.Login();
    await login.searchforEmail();
    await login.replyToEmail();

});
