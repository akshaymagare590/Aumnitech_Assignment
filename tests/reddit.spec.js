import { test, expect, chromium } from '@playwright/test';
import { reddit } from '../page/reddit.js';

test('reddit', async () => {

    const browser = await chromium.launch({
        headless: false,
    });
    const context = await browser.newContext();
    const page = await context.newPage();

    const Reddit = new reddit(page);
    await Reddit.GotoRedditHomePage();
    //page.pause(); 
    await Reddit.GoToSubreddit();
    await Reddit.gettingPostTitleAndComment();

    await browser.close();
});
