import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

test ("test", async () => {
  // Launch the browser
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // 1. Open the Reddit website
  await page.goto('https://www.reddit.com/r/learnprogramming/');


  // 2. Scroll to load more posts
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  // Wait for posts to load
  await page.waitForTimeout(2000); 

  // 3. Fetch post titles from index 40 to 45
  const titles = [];
  const posts = await page.locator("//a[@data-testid='post-title-text']"); // Select all posts (you may need to adjust the selector)

  for (let i = 39; i < 45; i++) {  // 40th to 45th posts, indices are 0-based
    const post = posts.nth(i);
    const title = await post.locator('h3').textContent(); // Adjust selector for the title
    titles.push(title);
    console.log(`Post Title ${i + 1}: ${title}`);
  }

  // 4. Click on comments and fetch the first comment of each post
  const comments = [];
  for (let i = 39; i < 45; i++) {
    const post = posts.nth(i);
    await post.locator('a[data-testid="post-title"]').click(); // Click on the post to open comments

    // Wait for comments to load
    await page.waitForTimeout(2000); // Wait for comments to load (adjust if needed)

    // 5. Fetch the first comment
    const firstComment = await page.locator('.Comment .RichTextJSON-root').first().textContent();
    comments.push(firstComment);

    console.log(`First comment for Post ${i + 1}: ${firstComment}`);

    // Navigate back to the subreddit page
    await page.goBack();
    await page.waitForTimeout(2000);
  }

  // 6. Verify that exactly 6 titles and comments were fetched
  if (titles.length === 6 && comments.length === 6) {
    console.log('Successfully fetched 6 titles and 6 comments.');
  } else {
    console.error('Error: Did not fetch exactly 6 titles and comments.');
  }

  // Close the browser
  await browser.close();
});
