const puppeteer = require('puppeteer');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        
        await page.goto('http://localhost:5173', { waitUntil: 'networkidle2', timeout: 10000 });
        
        const html = await page.$eval('.app-header', el => el.outerHTML);
        console.log("HEADER HTML:");
        console.log(html);
        
        await browser.close();
    } catch (e) {
        console.log("Error: " + e.message);
    }
})();
