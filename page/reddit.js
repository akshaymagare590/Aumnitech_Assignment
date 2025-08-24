exports.reddit = class reddit {
    constructor(page) {
        this.page = page;
        this.subreddit = page.locator("p[title='US seeks to deport Kilmar Abrego Garcia to Uganda after he refused to plead guilty in smuggling case']");
    }

    async GotoRedditHomePage() {
        await this.page.goto("https://www.reddit.com/");
    }

    async GoToSubreddit() {
        await this.subreddit.click(); 
    }
    async gettingPostTitleAndComment() {
        await this.page.evaluate(() => {
            const scrollableSection = document.querySelector('main#main-content');
            if (scrollableSection) {
                scrollableSection.scrollTop = scrollableSection.scrollHeight;
            }
        });
        const postLocator = "//main[@id='main-content']//a[@data-testid='post-title-text']";
        for (let n = 39; n <= 45; n++) {
           
            const post = this.page.locator(`${postLocator}:nth-of-type(${n + 1})`);         
            const title = await post.textContent();
            console.log(`Title of post ${n + 1}: ${title}`);
                    
            await post.click();
            await this.page.waitForSelector("//div[@slot='comment']"); 

            const commoncomments = await this.page.locator("//div[@slot='comment']");
            
            if (await commoncomments.count() > 0) {  
               
                const commentText = await commoncomments.nth(0).textContent();
                console.log(`First comment: ${commentText}`);
            } else {
                console.log("No comments available for this post.");
            }

           
            await this.page.goBack();
            await this.page.waitForTimeout(2000); 
        }
    }
}
