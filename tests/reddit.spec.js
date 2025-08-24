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


//Token- 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
//password- MH11dm4548