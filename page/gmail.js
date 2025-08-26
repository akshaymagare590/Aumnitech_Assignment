

exports.gmail = class gamil {


    constructor(page) {
        this.page = page;
        this.email = page.locator("//input[@type='email']");
        this.nextEmail = page.locator("//span[text()='Next']");
        this.password = page.locator("//input[@type='password']");
        this.nextPassword = page.locator("//span[text()='Next']");

        this.nextpage = page.locator("//div[@aria-label='Older']");
        this.reply = page.locator("//div[@aria-label='Reply']]");
        this.Body = page.locator("//div[@role='textbox']");
        this.send = page.locator("//div[text()='Send']");
    }

    async GotoLoginPage() {
        await this.page.goto("https://accounts.google.com/v3/signin/identifier?authuser=0&continue=https%3A%2F%2Fmail.google.com%2Fmail%2F&ec=GAlAFw&hl=en-GB&service=mail&flowName=GlifWebSignIn&flowEntry=AddSession&dsh=S2047323881%3A1755959387428774");
    }

    async Login(username, password) {
        await this.email.fill(username);
        await this.nextEmail.click();
        await this.page.waitForSelector("//input[@type='password']");
        await this.password.fill(password);
        await this.nextPassword.click();
    }

    async searchforEmail() {

        const Commonelement = await page.$$("//div[@class='xT']")

        for (const element of Commonelement) {
            const title = await element.textContent();
            if (title.includes("Interview Invite Aumni Techworks- 19-Aug-2025")) {
                element.click();
            }
            else {
                console.log("Email Not Found");
                await this.nextpage.click();
            }
        }
    }

    async replyToEmail() {
        await this.reply.click();
        await this.Body.fill("I accept the invitation to proceed to the next round");
        await this.send.click();
    }
}
